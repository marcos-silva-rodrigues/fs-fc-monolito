import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInput, FindClientFacadeOutput } from "./client-adm.facade.interface";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
    
    constructor(
        private findClientUseCase: FindClientUseCase,
        private addClientUseCase: AddClientUseCase
    ) {}
    
    async find(productId: string): Promise<FindClientFacadeOutput> {
        return this.findClientUseCase.execute({
            id: productId
        });
    }
    async add(product: AddClientFacadeInput): Promise<FindClientFacadeOutput> {
        return await this.addClientUseCase.execute(product);
    }
    
}