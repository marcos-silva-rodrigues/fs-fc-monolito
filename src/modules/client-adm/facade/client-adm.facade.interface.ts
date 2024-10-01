export interface FindClientFacadeOutput {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddClientFacadeInput {
    id?: string;
    name: string;
    email: string;
    address: string;
}


export default interface ClientAdmFacadeInterface {
    find(productId: string): Promise<FindClientFacadeOutput>
    add(product: AddClientFacadeInput): Promise<FindClientFacadeOutput>
}