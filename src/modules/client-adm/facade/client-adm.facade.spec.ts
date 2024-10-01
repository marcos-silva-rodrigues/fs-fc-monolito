import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientAdmFacadeFactory } from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {
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

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const input = {
            name: "Client 1",
            address: "Address 1",
            email: "x@email.com"
        };

        const clientFacade = ClientAdmFacadeFactory.create();
 
        const client = await clientFacade.add(input);

        const result = await ClientModel.findOne({
            where: {
                id: client.id
            }
        });

        expect(result.id).toBe(client.id)
        expect(result.updatedAt).toEqual(client.updatedAt);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
      
    });


    it("should find a client", async () => {
        const clientDb = await ClientModel.create({
            id: "1",
            name: "Client 1",
            address: "Address 1",
            email: "x@email.com",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const clientFacade = ClientAdmFacadeFactory.create();
 
        const input = {
            id: "1",
        };
 
        const output = await clientFacade.find(input.id);
 
        expect(output.id).toBe(clientDb.id);
        expect(output.name).toBe(clientDb.name);
        expect(output.email).toBe(clientDb.email);
        expect(output.address).toBe(clientDb.address);
        expect(output.updatedAt).toEqual(clientDb.createdAt);
        expect(output.createdAt).toEqual(clientDb.updatedAt);
    })
})