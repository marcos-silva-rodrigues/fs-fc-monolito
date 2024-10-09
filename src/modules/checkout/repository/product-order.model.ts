import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProductModel } from "../../store-catalog/repository/product.model";
import { OrderModel } from "./order.model";


@Table({
    tableName: 'products_order',
    timestamps: false
})
export class ProductOrderModel extends Model {

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare orderId: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare productId: string;
}