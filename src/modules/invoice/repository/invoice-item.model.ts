import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_items",
    timestamps: false
})
export default class InvoiceItemModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel

}