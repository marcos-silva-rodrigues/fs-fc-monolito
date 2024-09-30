import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
    constructor(private repository: ProductGateway ) {}

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this.repository.find(input.productId);

        return {
            productId: product.id.id,
            stock: product.stock
        }
    }
}