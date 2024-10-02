import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import { PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(
        private paymentUseCase: ProcessPaymentUseCase
    ) {}
    
    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this.paymentUseCase.execute(input);
    }

}