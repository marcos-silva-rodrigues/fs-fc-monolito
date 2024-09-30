import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade.factory";

describe("", () => {
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

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            description: "Product 1 desc",
            name: "Product 1",
            salesPrice: 100
        });

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        const product = await storeCatalogFacade.find({
            id: "1"
        });

        expect(product.id).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Product 1 desc");
        expect(product.salesPrice).toBe(100);
    })

    it("should find all product", async () => {
        await ProductModel.create({
            id: "1",
            description: "Product 1 desc",
            name: "Product 1",
            salesPrice: 100
        });

        await ProductModel.create({
            id: "2",
            description: "Product 2 desc",
            name: "Product 2",
            salesPrice: 200
        });

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        const products = await storeCatalogFacade.findAll();

        expect(products.length).toBe(2);

        expect(products[0]).toEqual({
            id: "1",
            description: "Product 1 desc",
            name: "Product 1",
            salesPrice: 100
        });

        expect(products[1]).toEqual({
            id: "2",
            description: "Product 2 desc",
            name: "Product 2",
            salesPrice: 200
        });

    })

})