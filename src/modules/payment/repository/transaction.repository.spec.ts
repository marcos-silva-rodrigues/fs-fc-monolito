import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";


describe("Transaction Repository test", () => {
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
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
        });
        transaction.approve();
        const transactionRepository = new TransactionRepository();
        const output = await transactionRepository.save(transaction);

        expect(transaction.id.id).toBe(output.id.id);
        expect(transaction.orderId).toBe(output.orderId);
        expect(transaction.status).toBe("approved");
        expect(transaction.amount).toBe(output.amount);
   });

})