import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add client usecase unit test", () => {
    it("should add a client", async () => {
        const respository = MockRepository();
        const usecase = new AddClientUseCase(respository);

        const input = {
            name: "Client 1",
            email: "x@email.com",
            address: "Address 1"
        }

        const output = await usecase.execute(input);

        expect(respository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.address).toBe(input.address);
    })
})