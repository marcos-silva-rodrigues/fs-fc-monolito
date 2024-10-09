import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { clientRouter } from "./routers/client.router";
import { productRouter } from "./routers/products.router";
import { ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import { catalogRouter } from "./routers/catalog.router";
import { ProductModel } from "../../modules/store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../database/config/migration-cli";

export const app: Express = express();
app.use(express.json());

app.use("/clients", clientRouter)
app.use("/products", productRouter)
app.use("/catalog", catalogRouter)

export let sequelize: Sequelize;
export let migration: Umzug<any>;

export async function setupDb() {

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ":memory:",
    logging: false
  })

  sequelize.addModels([ClientModel, ProductAdmModel, ProductModel])

  migration = migrator(sequelize)
  await migration.up()
  await sequelize.sync()

}

export async function teardownDb() {
  if (!migration || !sequelize) {
    return
  }
  migration = migrator(sequelize)
  await migration.down()
  await sequelize.close()
}

setupDb();