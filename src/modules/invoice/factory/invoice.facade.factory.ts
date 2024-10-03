import InvoiceFacade from "../facade/invoice.facade"
import InvoiceRepository from "../repository/invoice.repository"
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadefactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUseCase(invoiceRepository);
        const findUseCase = new FindInvoiceUseCase(invoiceRepository);
        return new InvoiceFacade(generateUsecase, findUseCase);
    }
}