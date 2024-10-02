import Id from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/address";
import Invoice from "../../domain/invoice";
import { InvoiceItem } from "../../domain/invoice-item";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    constructor(
        private repository: InvoiceGateway
    ) { }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        });
        const items = input.items.map(item => new InvoiceItem({
            id: item.id,
            name: item.name,
            price: item.price
        }));

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: address,
            items: items
        });
        
        await this.repository.save(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total
        }
    }
}