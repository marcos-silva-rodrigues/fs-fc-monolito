import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements  ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map(data => new Product({
            id: new Id(data.id),
            description: data.description,
            name: data.name,
            salesPrice: data.salesPrice,
        }));
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: {
                id: id
            }
        });

        return new Product({
            id: new Id(product.id),
            description: product.description,
            name: product.name,
            salesPrice: product.salesPrice,
        });
    }

    async add(product: Product): Promise<Product> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        })
        
        return product;
    }

}