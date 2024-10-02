import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import TransactionModel from "../repository/transaction.model";


describe("Payment Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize =  new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a transaction", async () => {
        const input = {
            amount: 100,
            orderId: "1",
        }
        const facade = PaymentFacadeFactory.create();
        const output = await facade.process(input);
       
        expect(output.transactionId).toBeDefined();
        expect(output.status).toBe("approved");
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
   });

})