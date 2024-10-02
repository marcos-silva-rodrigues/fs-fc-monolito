import Id from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/address"
import Invoice from "../../domain/invoice"
import { InvoiceItem } from "../../domain/invoice-item"
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const MockRepository = () => {
    return {
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(invoice),
    }
}


describe("Find invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const output = await usecase.execute({
            id: invoice.id.id
        });

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(invoice.id.id);
        expect(output.name).toBe(invoice.name);
        expect(output.total).toBe(invoice.total);
        expect(output.document).toBe(invoice.document);
        expect(output.address.zipCode).toBe(invoice.address.zipCode);
        expect(output.items.length).toBe(invoice.items.length);
    })
})