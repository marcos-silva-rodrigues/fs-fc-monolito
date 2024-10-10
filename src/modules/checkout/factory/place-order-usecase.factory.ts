import { ClientAdmFacade } from "../../client-adm/facade/client-adm.facade";
import { ClientAdmFacadeFactory } from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/facade/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/store-catalog.facade.factory";
import { CheckoutRepository } from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export class PlaceOrderUseCaseFactory {
    static create(): PlaceOrderUseCase {
        const repository = new CheckoutRepository();
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();

        return new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            catalogFacade,
            repository,
            invoiceFacade,
            paymentFacade
        );
    }
}