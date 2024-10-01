import Transaction from "../../domain/transaction";
import { PaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase {
    constructor(
        private paymentRepository: PaymentGateway
    ) {}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction(input);
        transaction.process();
        const persistenceTransaction = await this.paymentRepository.save(transaction);
        
        return {
            transactionId: persistenceTransaction.id.id,
            amount: persistenceTransaction.amount,
            orderId: persistenceTransaction.orderId,
            status: persistenceTransaction.status,
            createdAt: persistenceTransaction.createdAt,
            updatedAt: persistenceTransaction.updatedAt
        }
    }
}