import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import PlaceOrderUseCase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);
describe("PlaceOrderUsecase unit test", () => {

    describe("getProduct method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        })

        afterAll(() => {
            jest.useRealTimers();
        })

        // @ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null),
            }

            // @ts-expect-error
            placeOrderUsecase["catalogFacade"] = mockCatalogFacade;

            expect(() => placeOrderUsecase["getProduct"]("0"))
                .rejects.toThrow(new Error("Product not found"))
        })

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "Product 0",
                    description: "Product 0 description ",
                    salesPrice: 0
                }),
            }

            // @ts-expect-error
            placeOrderUsecase["catalogFacade"] = mockCatalogFacade;

            const result = await placeOrderUsecase["getProduct"]("0")
            expect(result).toEqual(new Product({
                id: new Id("0"),
                name: "Product 0",
                description: "Product 0 description ",
                salesPrice: 0
            }))
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        })


    })

});