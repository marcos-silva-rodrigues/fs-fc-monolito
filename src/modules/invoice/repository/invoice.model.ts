

import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript"
import AddressModel from "./address.model";
import InvoiceItemModel from "./invoice-item.model";

@Table({
    tableName: "invoices",
    timestamps: false
})
export default class InvoiceModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare total: number;

    @ForeignKey(() => AddressModel)
    @Column({ allowNull: false })
    declare addressId: string;

    @BelongsTo(() => AddressModel)
    declare address: AddressModel

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[]
}