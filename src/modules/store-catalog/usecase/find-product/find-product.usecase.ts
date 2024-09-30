import { ProductGateway } from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase {
    constructor(
        private repository: ProductGateway
    ) { }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.repository.find(input.id);

        return {
            id: product.id.id,
            description: product.description,
            name: product.name,
            salesPrice: product.salesPrice
        }
    }
}