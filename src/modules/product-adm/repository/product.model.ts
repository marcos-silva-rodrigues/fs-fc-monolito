import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: 'product-adm-table',
    tableName: 'products',
    timestamps: false
  })
export class ProductAdmModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column
    declare purchasePrice: number;

    @Column
    declare stock: number;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

}