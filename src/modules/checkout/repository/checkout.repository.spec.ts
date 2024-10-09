import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../store-catalog/repository/product.model";
import { ProductOrderModel } from "./product-order.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import { OrderModel } from "./order.model";
import { CheckoutRepository } from "./checkout.repository";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";

describe("Checkout Repository test", () => {
    let sequelize: Sequelize;
    const productModel01 = {
        id: "1",
        description: "Product 1 desc",
        name: "Product 1",
        salesPrice: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const productModel02 = {
        id: "2",
        description: "Product 2 desc",
        name: "Product 2",
        salesPrice: 25,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const productsModel = [productModel01, productModel02]

    const clientModel = {
        id: "1",
        name: "Client 1",
        address: "Address 1",
        email: "x@email.com",
        document: "1234-5678",
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipcode: "88888-888",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([OrderModel, ProductOrderModel, ProductModel, ClientModel])
        await sequelize.sync({
            force: true
        })
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a order", async () => {
        await ProductModel.create(productModel01);
        await ProductModel.create(productModel02);
        await ClientModel.create(clientModel);

        const repository = new CheckoutRepository();

        const input = new Order({
            client: new Client({
                id: new Id(clientModel.id),
                name: clientModel.name,
                email: clientModel.email,
                address: clientModel.street,
            }),
            products: productsModel.map(p => new Product({
                id: new Id(p.id),
                name: p.name,
                description: p.description,
                salesPrice: p.salesPrice
            }))
        })

        await repository.addOrder(input);

        const result = await OrderModel.findOne({
            where: {
                id: input.id.id
            },
            include: ProductOrderModel
        })

        expect(result.id).toBe(input.id.id)
        expect(result.status).toBe("pending")
        expect(result.clientId).toBe(clientModel.id)
        expect(result.products).toHaveLength(2)
        expect(result.products[0].productId).toBe(productModel01.id)
        expect(result.products[1].productId).toBe(productModel02.id)

    });

    it("should find a order", async () => {
        await ProductModel.create(productModel01);
        await ProductModel.create(productModel02);
        await ClientModel.create(clientModel);
        await OrderModel.create({
            id: "1o",
            status: "approved",
            clientId: clientModel.id,
            products: [
                {
                    orderId: "1o",
                    productId: productModel01.id,
                },
                {
                    orderId: "1o",
                    productId: productModel02.id,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date()

        }, { include: ProductOrderModel});

        const repository = new CheckoutRepository();
        const output = await repository.findOrder("1o");

        expect(output.status).toBe("approved");
        expect(output.client.id.id).toBe(clientModel.id);
        expect(output.products).toHaveLength(2);
        expect(output.products[0].id.id).toBe(productModel01.id);
        expect(output.products[1].id.id).toBe(productModel02.id);
    });
})