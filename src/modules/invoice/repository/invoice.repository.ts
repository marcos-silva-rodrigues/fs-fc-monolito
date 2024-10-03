import { Address } from "../domain/address";
import Invoice from "../domain/invoice";
import { InvoiceItem } from "../domain/invoice-item";
import InvoiceGateway from "../gateway/invoice.gateway";
import AddressModel from "./address.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const result = await InvoiceModel.findOne({
            where: {
                id: id
            },
            include: [AddressModel, InvoiceItemModel]
        });

        const address = new Address({
            id: result.address.id,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipCode: result.address.zipCode,
        })

        const items = result.items.map(item => new InvoiceItem({
            id: item.id,
            name: item.name,
            price: item.price
        }));

        return new Invoice({
            id: result.id,
            document: result.document,
            name: result.name,
            address: address,
            items: items,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        });
    }
    async save(entity: Invoice): Promise<Invoice> {
        const invoiceItems = entity.items.map((item) => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
        }));

        const address = {
            id: entity.address.id.id,
            street: entity.address.street,
            number: entity.address.number,
            complement: entity.address.complement,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
        }

        await InvoiceModel.create({
            id: entity.id.id,
            document: entity.document,
            name: entity.name,
            total: entity.total,
            addressId: entity.address.id.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            items: invoiceItems,
            address: address
        }, {
            include: [InvoiceItemModel, AddressModel]
        })

        return entity;

    }

}