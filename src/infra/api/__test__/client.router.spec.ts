import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "Fulano",
                email: "fulano@email.com",
                document: "123-123",
                street: "Street 01",
                number: "1",
                complement: "",
                city: "São Paulo",
                state: "São Paulo",
                zipCode: "12345-098"
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Fulano");
        expect(response.body.email).toBe("fulano@email.com");
        expect(response.body.document).toBe("123-123");

    })


});