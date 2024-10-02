import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase";

const MockRepository = () => {
    return {
        save: jest.fn(),
    }
}

describe("Process Payment usecase unit test", () => {
    it("should approve a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
            status: "approved"
        });
        const paymentRepository = MockRepository();
        paymentRepository.save.mockResolvedValue(transaction);

        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100
        };

        const output = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();

        expect(output.transactionId).toBe(transaction.id.id);
        expect(output.status).toBe("approved");
        expect(output.amount).toBe(100);
        expect(output.orderId).toBe("1");
        expect(output.createdAt).toEqual(transaction.createdAt);
        expect(output.updatedAt).toEqual(transaction.updatedAt);
    });

    it("should decline a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 50,
            orderId: "1",
            status: "declined"
        });

        const paymentRepository = MockRepository();
        paymentRepository.save.mockResolvedValue(transaction);

        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50
        };

        const output = await usecase.execute(input);

        expect(output.transactionId).toBe(transaction.id.id);
        expect(output.status).toBe("declined");
        expect(output.amount).toBe(50);
        expect(output.orderId).toBe("1");
        expect(output.createdAt).toEqual(transaction.createdAt);
        expect(output.updatedAt).toEqual(transaction.updatedAt);
    })
});