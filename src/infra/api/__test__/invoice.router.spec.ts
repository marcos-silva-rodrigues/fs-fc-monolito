import request from "supertest";
import { app, setupDb, teardownDb } from "../express";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-item.model";
import AddressModel from "../../../modules/invoice/repository/address.model";

const invoiceMockData = {
    id: "1",
    document: "123-absct1/24",
    name: "invoice 90872",
    total: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [{
        id: "3",
        name: "product 01",
        price: 120
    },
    {
        id: "4",
        name: "product 2",
        price: 80
    }],
    address: {
        id: "2",
        street: "street 1",
        number: "number 1",
        complement: "complement 1",
        city: "city 1",
        state: "state 1",
        zipCode: "12345-098",
    }
};

describe("E2E test for invoices", () => {
    beforeEach(async () => {
        await setupDb()
    })

    afterEach(async () => {
        await teardownDb();
    })

    it("should find an invoice", async () => {
        await InvoiceModel.create(
            invoiceMockData, {
            include: [InvoiceItemModel, AddressModel]
        });

        const response = await request(app)
            .post("/invoices/1");


        expect(response.status).toBe(200);
        expect(response.body.id).toBe(invoiceMockData.id);
        expect(response.body.total).toBe(invoiceMockData.total);
        expect(response.body.items).toHaveLength(2);
    })


});