import { ProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductUseCase {
    constructor(
        private repository: ProductGateway
    ) {}

    async execute(): Promise<FindAllProductsDto> {
        const products = await this.repository.findAll();

        return {
            products: products.map(data => ({
                id: data.id.id,
                description: data.description,
                name: data.name,
                salesPrice: data.salesPrice
            }))
        };
    }
}