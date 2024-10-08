import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe("AddProduct UseCase unit test", () => {
    it("should create a product to catalog", async () => {

        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 120,
        };

        const output = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(output.id).toBe(input.id);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.salesPrice).toBe(input.salesPrice);
    });
});

