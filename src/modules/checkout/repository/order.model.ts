import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../store-catalog/repository/product.model";
import { ProductOrderModel } from "./product-order.model";


@Table({
    tableName: 'orders',
    timestamps: false
  })
export class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    declare clientId: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

    @HasMany(() => ProductOrderModel)
    declare products: ProductOrderModel[];

    @Column({ allowNull: false })
    declare status: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

}