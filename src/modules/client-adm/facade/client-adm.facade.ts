import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
    
    constructor(
        private findClientUseCase: FindClientUseCase,
        private addClientUseCase: AddClientUseCase
    ) {}

    async find(productId: string): Promise<FindClientFacadeOutputDto> {
        return await this.findClientUseCase.execute({ id: productId});
    }
    async add(product: AddClientFacadeInputDto): Promise<void> {
        await this.addClientUseCase.execute(product);
    }
    

    
}