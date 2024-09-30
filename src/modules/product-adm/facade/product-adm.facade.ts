import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import { AddProductFacadeInputDto, CheckStoreFacadeInputDto, CheckStoreFacadeOutputDto, ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    
    constructor(
        private addUserCase: AddProductUseCase,
        private checkStockUseCase: CheckStockUseCase
    ) { }
    
    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this.addUserCase.execute(input);
    }

    checkStock(input: CheckStoreFacadeInputDto): Promise<CheckStoreFacadeOutputDto> {
        return this.checkStockUseCase.execute(input);
    }
    
}