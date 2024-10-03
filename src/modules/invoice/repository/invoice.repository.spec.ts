import { Sequelize } from "sequelize-typescript"
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import AddressModel from "./address.model";
import Invoice from "../domain/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/address";
import { InvoiceItem } from "../domain/invoice-item";
import InvoiceRepository from "./invoice.repository";

const invoice = new Invoice({
    id: new Id().id,
    name: "invoice 1308",
    document: "",
    address: new Address({
        id: new Id().id,
        street: "street 1",
        number: "number 1",
        complement: "complement 1",
        city: "city 1",
        state: "state 1",
        zipCode: "12345-098",
    }),
    items: [
        new InvoiceItem({
            id: new Id().id,
            name: "Item 1",
            price: 100
        })
    ]

});

const invoiceModelResult = {
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


describe("Invoice Repository test", () => {
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

        sequelize.addModels([InvoiceModel, InvoiceItemModel, AddressModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a invoice", async () => {

        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.save(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: {
                id: invoice.id.id
            },
            include: [InvoiceItemModel, AddressModel]
        });

        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.total).toBe(invoice.total);
        expect(invoiceDb.document).toBe(invoice.document);

        expect(invoiceDb.addressId).toBe(invoice.address.id.id);

        expect(invoiceDb.items.length).toBe(invoice.items.length);
        expect(invoiceDb.items[0].id).toBe(invoice.items[0].id.id);
    });

    it("should find a invoice", async () => {
        await InvoiceModel.create(
            invoiceModelResult, {
            include: [InvoiceItemModel, AddressModel]
        });

        const invoiceRepository = new InvoiceRepository();
        const output = await invoiceRepository.find(invoiceModelResult.id);

    
        expect(output.id.id).toBe(invoiceModelResult.id);
        expect(output.name).toBe(invoiceModelResult.name);
        expect(output.total).toBe(invoiceModelResult.total);
        expect(output.document).toBe(invoiceModelResult.document);

        expect(output.address.id.id).toBe(invoiceModelResult.address.id);

        expect(output.items.length).toBe(invoiceModelResult.items.length);
        expect(output.items[0].id.id).toBe(invoiceModelResult.items[0].id);
        expect(output.items[1].id.id).toBe(invoiceModelResult.items[1].id);
   })

});