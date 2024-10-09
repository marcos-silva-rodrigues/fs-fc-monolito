import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    description: "Product 1 desc",
    name: "Product 1",
    salesPrice: 100
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue(product),
        add: jest.fn()
    }
}

describe("Find a product usecase unit test", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const output = await usecase.execute({
            id: "1"
        });

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(product.id.id);
        expect(output.name).toBe(product.name);
        expect(output.description).toBe(product.description);
        expect(output.salesPrice).toBe(product.salesPrice);
    })
})