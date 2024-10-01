import { ClientAdmFacade } from "../facade/client-adm.facade";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientRepository from "../repository/client.respository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export class ClientAdmFacadeFactory {
    static create(): ClientAdmFacadeInterface {
        const repository = new ClientRepository();
        const findUseCase = new FindClientUseCase(repository);
        const addUseCase = new AddClientUseCase(repository);
        return new ClientAdmFacade(findUseCase, addUseCase);
    }   
}