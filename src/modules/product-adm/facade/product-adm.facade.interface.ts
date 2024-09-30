export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStoreFacadeInputDto {
    productId: string;
}

export interface CheckStoreFacadeOutputDto {
    productId: string;
    stock: number;
}

export interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(
        input: CheckStoreFacadeInputDto
    ): Promise<CheckStoreFacadeOutputDto>;
}