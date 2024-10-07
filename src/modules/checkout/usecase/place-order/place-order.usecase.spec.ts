
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { FindClientOutputDto } from "../../../client-adm/usecase/find-client/find-client.dto";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/facade.interface";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);
describe("PlaceOrderUsecase unit test", () => {
    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        })

        afterAll(() => {
            jest.useRealTimers();
        })

        afterEach(() => {
            jest.clearAllMocks();
        })

        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            };

            // @ts-expect-error - no params in contructor
            const placeOrderUsecase = new PlaceOrderUseCase();
            // @ts-expect-error - force set clientFacade
            placeOrderUsecase["clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            expect(() => placeOrderUsecase.execute(input))
                .rejects.toThrow(new Error("Client not found"))
        })

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            };

            // @ts-expect-error - no params in contructor
            const placeOrderUsecase = new PlaceOrderUseCase();

            const mockValidateProducts = jest
                .spyOn(placeOrderUsecase, "execute")
                .mockRejectedValue(new Error("No products selected"));

            // @ts-expect-error - force set clientFacade
            placeOrderUsecase["clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            expect(() => placeOrderUsecase.execute(input))
                .rejects.toThrow(new Error("No products selected"));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        })

        describe("place an order", () => {
            const clientProps: FindClientOutputDto = {
                id: "1c",
                name: "Cliente 0",
                email: "client_o@email.com",
                document: "0",
                address: new Address(
                    "some address",
                    "1",
                    "",
                    "some city",
                    "some state",
                    "000"
                ),
                createdAt: new Date(),
                updatedAt: new Date()

            }

            const mockClientFacade: ClientAdmFacadeInterface = {
                find: jest.fn().mockResolvedValue(clientProps),
                add: jest.fn()
            }

            const mockPaymentFacade: PaymentFacadeInterface = {
                process: jest.fn()
            }

            const mockCheckoutRepo: CheckoutGateway = {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }

            const mockInvoiceFacade: InvoiceFacadeInterface = {
                generateInvoice: jest.fn().mockResolvedValue({
                    id: "1i"
                }),
                findInvoice: jest.fn()
            }

            const placeOrderUsecase = new PlaceOrderUseCase(
                mockClientFacade,
                null,
                null,
                mockCheckoutRepo,
                mockInvoiceFacade,
                mockPaymentFacade
            )

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "some description",
                    salesPrice: 40
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "some description",
                    salesPrice: 30
                })
            };

            const mockValidateProducts = jest.spyOn(PlaceOrderUseCase.prototype as any,
                "validateProducts")
                .mockResolvedValue(null);

            const mockGetProduct = jest.spyOn(PlaceOrderUseCase.prototype as any,
                "getProduct")
                // @ts-expect-error - not return never
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId];
                });

            it("should not be approved", async () => {
                const mockProcessPayment = jest
                    .spyOn(mockPaymentFacade, "process")
                    .mockResolvedValue({
                        transactionId: "1t",
                        orderId: "1o",
                        amount: 100,
                        status: "error",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [
                        {
                            productId: "1",
                        },
                        {
                            productId: "2"
                        }
                    ]
                }

                let output = await placeOrderUsecase.execute(input);
                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    { productId: "1" }, { productId: "2", }
                ])
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith("1c");

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);

                expect(mockProcessPayment).toHaveBeenCalledTimes(1);
                expect(mockProcessPayment).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });

                expect(mockInvoiceFacade.generateInvoice).not.toHaveBeenCalled()
            })

            it("should be approved", async () => {
                const mockProcessPayment = jest
                    .spyOn(mockPaymentFacade, "process")
                    .mockResolvedValue({
                        transactionId: "1t",
                        orderId: "1o",
                        amount: 100,
                        status: "approved",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [
                        {
                            productId: "1",
                        },
                        {
                            productId: "2"
                        }
                    ]
                }

                let output = await placeOrderUsecase.execute(input);
                expect(output.invoiceId).toBe("1i");
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    { productId: "1" }, { productId: "2", }
                ])
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith("1c");
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);

                expect(mockProcessPayment).toHaveBeenCalledTimes(1);
                expect(mockProcessPayment).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });

                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalled()
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledWith({
                    name: clientProps.name,
                    document: clientProps.document,
                    street: "some address",
                    number: "1",
                    complement: "",
                    city: "some city",
                    state: "some state",
                    zipCode: "000",
                    items: Object.values(products).map(p => {
                        return {
                            id: p.id.id,
                            name: p.name,
                            price: p.salesPrice
                        }
                    }),

                })

            })
        })
    })
})