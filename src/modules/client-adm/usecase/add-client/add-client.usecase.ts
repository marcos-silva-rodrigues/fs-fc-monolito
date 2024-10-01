import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
    constructor(
        private repository: ClientGateway
    ) {}

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const id = input.id ? new Id(input.id) : null
        const client = new Client({
            ...input,
            id
        });
        await this.repository.add(client);

        return {
            ...input,
            id: id ? id.id : client.id.id,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
}