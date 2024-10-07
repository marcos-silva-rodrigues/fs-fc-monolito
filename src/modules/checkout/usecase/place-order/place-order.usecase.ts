import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase {

    constructor(
        private clientFacade: ClientAdmFacadeInterface,
        private productFacade: ProductAdmFacadeInterface,
        private catalogFacade: StoreCatalogFacadeInterface,
        private checkoutRepository: CheckoutGateway,
        private invoiceFacade: InvoiceFacadeInterface,
        private paymentFacade: PaymentFacadeInterface
    ) { }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this.clientFacade.find(input.clientId);
        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            address: client.address.street,
            email: client.email,
        });

        const order = new Order({
            client: myClient,
            products
        });

        const payment = await this.paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        });

        const invoice =
            payment.status === "approved" ?
                await this.invoiceFacade.generateInvoice({
                    name: client.name,
                    document: client.document,
                    items: products.map(p => ({
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrice
                    })),
                    city: client.address.city,
                    complement: client.address.complement,
                    number: client.address.number,
                    state: client.address.state,
                    street: client.address.street,
                    zipCode: client.address.zipCode
                }) : null;

        payment.status === "approved" && order.approved();

        await this.checkoutRepository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: invoice?.id || null,
            status: order.status,
            total: order.total,
            products: order.products.map(p => ({
                productId: p.id.id
            }))
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected")
        }

        for (const p of input.products) {
            const product = await this.productFacade.checkStock({
                productId: p.productId,
            });

            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`);
            }

        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this.catalogFacade.find({ id: productId });
        if (!product) {
            throw new Error("Product not found");
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });

    }
}