
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductAdmModel } from "../../../modules/product-adm/repository/product.model";
import { ProductModel } from "../../../modules/store-catalog/repository/product.model";
import { app, setupDb, teardownDb } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {

    beforeEach(async () => {
        await setupDb();
    })

    afterEach(async () => {
        await teardownDb();
    })

    it("should throw error if not find a client", async () => {
        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: []
            });


        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Client not found");
    })

    it("should throw error if not find products seleted", async () => {
        await ClientModel.create({
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
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: []
            });


        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No products selected");
    })

    it("should throw error if products are not in stock", async () => {
        await ClientModel.create({
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
        });

        await ProductAdmModel.create({
            id: "1",
            name: "Product 1",
            description: "description",
            purchasePrice: 100,
            stock: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [
                    {
                        productId: '1'
                    }
                ]
            });


        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Product 1 is not available in stock");
    })

    it("should create a sucessfull order", async () => {
        await ClientModel.create({
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
        });

        await ProductAdmModel.create({
            id: "1",
            name: "Product 1",
            description: "description",
            purchasePrice: 80,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await ProductModel.update({
            salesPrice: 120,
        }, {
            where: {
                id: "1"
            }
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [
                    {
                        productId: '1'
                    }
                ]
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(120);
        expect(response.body.products).toHaveLength(1);
        expect(response.body.products[0].productId).toBe("1");
    })
});