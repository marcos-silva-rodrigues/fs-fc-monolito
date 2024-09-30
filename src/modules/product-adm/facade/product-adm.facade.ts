import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import { AddProductFacadeInputDto, CheckStoreFacadeInputDto, CheckStoreFacadeOutputDto, ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    
    constructor(
        private addUserCase: AddProductUseCase
    ) { }
    
    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this.addUserCase.execute(input);
    }

    checkStock(input: CheckStoreFacadeInputDto): Promise<CheckStoreFacadeOutputDto> {
        throw new Error("Method not implemented.");
    }
    
}