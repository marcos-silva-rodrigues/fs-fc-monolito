
export interface FindStoreCatalogFacadeInputDto {
    id: string
}

export interface FindStoreCatalogFacadeOutputDto {
    id: string;
    name: string,
    description: string,
    salesPrice: number
}

export default interface StoreCatalogFacadeInterface {
    find(props: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindStoreCatalogFacadeOutputDto[]>;
}