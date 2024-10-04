import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase {
    constructor(
        private repository: ClientGateway
    ) {}

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
      
        const client = await this.repository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
}