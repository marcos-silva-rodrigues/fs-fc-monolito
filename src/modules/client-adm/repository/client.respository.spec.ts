import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.respository";

describe("Client Repository test", () => {
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
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            address: "Address 1",
            email: "x@email.com"
        });
        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({
            where: {
                id: "1"
            }
        });

        expect(client.id.id).toBe(clientDb.id);
        expect(client.name).toBe(clientDb.name);
        expect(client.email).toBe(clientDb.email);
        expect(client.address).toBe(clientDb.address);
        expect(client.updatedAt).toBeDefined();
        expect(client.createdAt).toBeDefined();
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

        const clientRepository = new ClientRepository();
        const client = await clientRepository.find("1");
    
        expect(client.id.id).toBe(clientDb.id);
        expect(client.name).toBe(clientDb.name);
        expect(client.email).toBe(clientDb.email);
        expect(client.address).toBe(clientDb.address);
        expect(client.updatedAt).toEqual(clientDb.createdAt);
        expect(client.createdAt).toEqual(clientDb.updatedAt);
    })
})