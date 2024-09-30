import FindAllProductUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    constructor(
        private findUseCase: FindProductUseCase,
        private findAllUseCase: FindAllProductUseCase
    ) {}

    async find(props: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this.findUseCase.execute(props);
    }
    
    async findAll(): Promise<FindStoreCatalogFacadeOutputDto[]> {
        const { products } = await this.findAllUseCase.execute();
        return products;
    }

}