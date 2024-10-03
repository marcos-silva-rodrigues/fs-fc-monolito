import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private generateInvoiceUseCase: GenerateInvoiceUseCase,
        private findInvocieUseCase: FindInvoiceUseCase
    ) {}

    async findInvoice(args: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this.findInvocieUseCase.execute(args);
    }

    async generateInvoice(args: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this.generateInvoiceUseCase.execute(args);
    }

}