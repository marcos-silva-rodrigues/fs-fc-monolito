import { Sequelize } from "sequelize-typescript";
import { ProductAdmModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "./facade.factory";

describe("ProductAdmFacade test", () => {
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

        sequelize.addModels([ProductAdmModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
       const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        };

        await productFacade.addProduct(input);

        const product = await ProductAdmModel.findOne({
            where: {
                id: "1"
            }
        });

        expect(product).toBeDefined();
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });


    it("should check product stock", async () => {
        const productFacade = ProductAdmFacadeFactory.create();
 
         const input = {
             id: "1",
             name: "product 1",
             description: "Product 1 description",
             purchasePrice: 10,
             stock: 10
         };
 
         await productFacade.addProduct(input);

         const output = await productFacade.checkStock({
            productId: "1",
         });
 
 
         expect(output).toBeDefined();
         expect(output.productId).toBe(input.id);
         expect(output.stock).toBe(input.stock);
    })
})