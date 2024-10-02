
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        save: jest.fn(),
        find: jest.fn(),
    }
}


describe("Find invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceProps: GenerateInvoiceUseCaseInputDto = {
            name: "invoice 1308",
            document: "123-4546-092",
            street: "street 1",
            number: "number 1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "12345-098",
            items: [{
                id: "1",
                name: "Item 1",
                price: 100
            }]
        }

        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const output: GenerateInvoiceUseCaseOutputDto = await usecase.execute(invoiceProps);

        expect(invoiceRepository.save).toHaveBeenCalled();
        expect(output.id).toBeDefined()
        expect(output.total).toBe(100)

        expect(output.items).toHaveLength(1)
        expect(output).toMatchObject(invoiceProps);
    })
})