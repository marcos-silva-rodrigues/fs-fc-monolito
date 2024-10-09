import { Sequelize } from "sequelize-typescript";
import AddressModel from "../repository/address.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

const generateInvoiceDto = {
    name: "invoice 90872",
    document: "123-absct1/24",
    street: "street 1",
    number: "number 1",
    complement: "complement 1",
    city: "city 1",
    state: "state 1",
    zipCode: "12345-098",
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
};

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

describe("InvoiceFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true,
            }
        });

        sequelize.addModels([
            InvoiceModel,
            InvoiceItemModel,
            AddressModel
        ])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        const invoice = await facade.generateInvoice(generateInvoiceDto);

        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(generateInvoiceDto.name);
        expect(invoice.document).toBe(generateInvoiceDto.document);
        expect(invoice.total).toBe(200);

        expect(invoice.zipCode).toBe(generateInvoiceDto.zipCode);

        expect(invoice.items.length).toBe(generateInvoiceDto.items.length);
        expect(invoice.items[0].id).toBe(generateInvoiceDto.items[0].id);
        expect(invoice.items[1].id).toBe(generateInvoiceDto.items[1].id);
    });

    it("should find a invoice", async () => {
        await InvoiceModel.create(invoiceModelResult, {
            include: [AddressModel, InvoiceItemModel]
        });

        const facade = InvoiceFacadeFactory.create();
        const invoice = await facade.findInvoice({ id: "1"});

        expect(invoice.id).toBe(invoiceModelResult.id);
        expect(invoice.name).toBe(invoiceModelResult.name);
        expect(invoice.document).toBe(invoiceModelResult.document);
        expect(invoice.total).toBe(invoiceModelResult.total);

        expect(invoice.address.zipCode).toBe(invoiceModelResult.address.zipCode);

        expect(invoice.items.length).toBe(invoiceModelResult.items.length);
        expect(invoice.items[0].id).toBe(invoiceModelResult.items[0].id);
        expect(invoice.items[1].id).toBe(invoiceModelResult.items[1].id);
    });


})