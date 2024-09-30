import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductUseCase from "./find-all-products.usecase";

const product1 = new Product({
    id: new Id("1"),
    description: "Product 1 desc",
    name: "Product 1",
    salesPrice: 100
});

const product2 = new Product({
    id: new Id("2"),
    description: "Product 2 desc",
    name: "Product 2",
    salesPrice: 200
});


const MockRepository = () => {
    return {
        findAll: jest.fn().mockResolvedValue([product1, product2]),
        find: jest.fn()
    }
}

describe("Find all products usecase unit test", () => {
    it("should find all products", async () => {
        const productRepository = MockRepository()
        const usecase = new FindAllProductUseCase(productRepository);

        const output = await usecase.execute();

        expect(output.products.length).toBe(2);
        expect(productRepository.findAll).toHaveBeenCalled();
        
        expect(output.products[0]).toEqual({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice
        });

        expect(output.products[1]).toEqual({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice
        });

    })
});