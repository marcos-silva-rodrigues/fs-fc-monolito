import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";

describe("Product Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize =  new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10
        });
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: {
                id: "1"
            }
        });

        expect(product.id.id).toEqual(productDb.id);
        expect(product.name).toEqual(productDb.name);
        expect(product.description).toEqual(productDb.description);
        expect(product.purchasePrice).toEqual(productDb.purchasePrice);
        expect(product.stock).toEqual(productDb.stock);
    });

    it("should find a product", async () => {
        const productDb = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const productRepository = new ProductRepository();
        const product = await productRepository.find("1");

    
        expect(product.id.id).toEqual(productDb.id);
        expect(product.name).toEqual(productDb.name);
        expect(product.description).toEqual(productDb.description);
        expect(product.purchasePrice).toEqual(productDb.purchasePrice);
        expect(product.stock).toEqual(productDb.stock);
    })
})