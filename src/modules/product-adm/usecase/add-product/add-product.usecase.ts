import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {

    constructor(private productRepository: ProductGateway) {}

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const product = new Product({
            ...input,
            id: new Id(input.id)
        })

        await this.productRepository.add(product);

        return {
            id: product.id.id,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            description: product.description,
            name: product.name,
            purchasePrice: product.purchasePrice,
            stock: product.stock
        }
    }
}