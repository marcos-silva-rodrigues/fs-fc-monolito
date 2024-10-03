import { BelongsTo, Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript"
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "addresses",
    timestamps: false
})
export default class AddressModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @Column({ allowNull: false })
    declare complement: string;
}