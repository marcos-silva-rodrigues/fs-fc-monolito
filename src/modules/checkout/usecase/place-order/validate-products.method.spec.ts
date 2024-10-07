import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe("PlaceOrderUsecase unit test", () => {

    describe("validateProducts method", () => {
        // @ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();

        it("should throw error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"));
        })

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) => Promise.resolve({
                    productId,
                    stock: productId === "1" ? 0 : 1
                }))
            }

            // @ts-expect-error - force set productFacade
            placeOrderUsecase["productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1" }]
            };

            await expect(placeOrderUsecase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"));

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }]
            };

            await expect(placeOrderUsecase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"));

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
            };

            await expect(placeOrderUsecase['validateProducts'](input))
                .rejects.toThrow(new Error("Product 1 is not available in stock"));

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)
        })
    });
})


