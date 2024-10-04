import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.respository";
import Address from "../../@shared/domain/value-object/address";

describe("Client Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
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
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            ),
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
        expect(clientDb.street).toEqual(client.address.street)
        expect(clientDb.number).toEqual(client.address.number)
        expect(clientDb.complement).toEqual(client.address.complement)
        expect(clientDb.city).toEqual(client.address.city)
        expect(clientDb.state).toEqual(client.address.state)
        expect(clientDb.zipcode).toEqual(client.address.zipCode)
        expect(client.updatedAt).toBeDefined();
        expect(client.createdAt).toBeDefined();
    });

    it("should find a client", async () => {
        const clientDb = await ClientModel.create({
            id: "1",
            name: "Client 1",
            address: "Address 1",
            email: "x@email.com",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888-888",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const clientRepository = new ClientRepository();
        const client = await clientRepository.find("1");

        expect(client.id.id).toBe(clientDb.id);
        expect(client.name).toBe(clientDb.name);
        expect(client.email).toBe(clientDb.email);
        expect(client.address.street).toEqual(clientDb.street)
        expect(client.address.number).toEqual(clientDb.number)
        expect(client.address.complement).toEqual(clientDb.complement)
        expect(client.address.city).toEqual(clientDb.city)
        expect(client.address.state).toEqual(clientDb.state)
        expect(client.address.zipCode).toEqual(clientDb.zipcode)
        expect(client.updatedAt).toEqual(clientDb.updatedAt);
        expect(client.createdAt).toEqual(clientDb.createdAt);
    })
})