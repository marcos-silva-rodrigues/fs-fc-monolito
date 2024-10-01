export interface ProcessPaymentInputDto {
    amount: number;
    orderId: string;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    orderId: string;
    status: string;
    amount: number;
    
    createdAt: Date;
    updatedAt: Date;
}