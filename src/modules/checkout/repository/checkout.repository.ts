import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";
import { ProductOrderModel } from "./product-order.model";
import { v4 as uuid } from "uuid";

export class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {


        await OrderModel.create({
            id: order.id.id,
            status: order.status,
            clientId: order.client.id.id,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            products: order.products.map(p => ({
                productId: p.id.id,
                orderId: order.id.id
            }))
        }, {
            include: ProductOrderModel
        })

    }

    async findOrder(id: string): Promise<Order | null> {
        const model = await OrderModel.findOne({
            where: {
                id: id
            },
            include: [ClientModel, ProductOrderModel]
        })

        console.log(model);

        if (!model) return null;

        const productsModel = await ProductModel.findAll({
            where: {
                id: model.products.map(p => p.productId)
            }
        })

        const order = new Order({
            id: new Id(model.id),
            status: model.status,
            client: new Client({
                id: new Id(model.client.id),
                name: model.client.name,
                email: model.client.email,
                address: model.client.street,
            }),
            products: productsModel.map(model => new Product({
                id: new Id(model.id),
                name: model.name,
                description: model.description,
                salesPrice: model.salesPrice
            }))
        })

        return order;
    }

}