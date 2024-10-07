import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { clientRouter } from "./routers/client.router";
import { productRouter } from "./routers/products.router";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

export const app: Express = express();
app.use(express.json());

app.use("/clients", clientRouter)
app.use("/products", productRouter)

export let sequelize: Sequelize;
async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });

    sequelize.addModels([ClientModel, ProductModel])
    await sequelize.sync();
    
}

setupDb();