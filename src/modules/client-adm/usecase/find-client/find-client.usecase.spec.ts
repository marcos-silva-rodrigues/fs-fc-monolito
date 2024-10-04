import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "x@email.com",
    document: "1234-5678",
    address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
      )
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(client),
    }
}

describe("Find client usecase unit test", () => {
    it("should find a client", async () => {
        const respository = MockRepository();
        const usecase = new FindClientUseCase(respository);

        const input = {
            id: "1"
        }

        const output = await usecase.execute(input);

        expect(respository.find).toHaveBeenCalled();
        expect(output.id).toBe(client.id.id);
        expect(output.name).toBe(client.name);
        expect(output.email).toBe(client.email);
        expect(output.address).toBe(client.address);
    })
})