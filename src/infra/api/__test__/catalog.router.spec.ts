
import { app, setupDb, teardownDb } from "../express";
import request from "supertest";

describe("E2E test for catalog", () => {

    beforeEach(async () => {
        await setupDb();
    })

    afterEach(async () => {
        await teardownDb();
    })

    it("should create a catalog", async () => {
        const responseProducts = await request(app)
            .post("/products")
            .send({
                name: "Product o1",
                description: "Desc Product 01",
                purchasePrice: 20.0,
                stock: 10.0,
            });
            
        expect(responseProducts.status).toBe(201);
    

        const responseCatalog = await request(app)
            .post("/catalog")
            .send({
                id: responseProducts.body.id,
                name: responseProducts.body.name,
                description: responseProducts.body.description,
                salesPrice: 55.0,
            });

            console.log("catalog", responseCatalog.body)

        expect(responseCatalog.status).toBe(201);
        expect(responseCatalog.body.id).toBe(responseProducts.body.id);
        expect(responseCatalog.body.name).toBe(responseProducts.body.name);
        expect(responseCatalog.body.salesPrice).toBe(55);
    })
});