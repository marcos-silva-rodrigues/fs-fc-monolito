import { ProductRepository } from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import { ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacadeInterface {
        const productRepository = new ProductRepository();
        const addProductUseCase =  new AddProductUseCase(productRepository);
        return new ProductAdmFacade(addProductUseCase);
    }
}