import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product o1",
                description: "Desc Product 01",
                purchasePrice: 20.0,
                stock: 10.0,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe( "Product o1");

        expect(response.body.purchasePrice).toBe(20.0);
        expect(response.body.stock).toBe(10.0);

    })


});