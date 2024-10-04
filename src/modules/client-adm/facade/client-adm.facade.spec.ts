import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientAdmFacadeFactory } from "../factory/client-adm.facade.factory";
import Address from "../../@shared/domain/value-object/address";

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
            id: "1",
            name: "Client 1",
            email: "x@email.com",
            document: "1234-5678",
            address: new Address(
              "Rua 123",
              "99",
              "Casa Verde",
              "Criciúma",
              "SC",
              "88888-888",
            )
        };

        const clientFacade = ClientAdmFacadeFactory.create();
 
        await clientFacade.add(input);

        const client = await ClientModel.findOne({
            where: {
                id: "1"
            }
        });

        expect(client).toBeDefined()
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.document).toBe(input.document)
        expect(client.street).toBe(input.address.street)
      
    });


    it("should find a client", async () => {
        const clientDb = await ClientModel.create({
            id: "1",
            name: "Client 1",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888-888",
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
        expect(output.document).toBe(clientDb.document)
        expect(output.address.street).toBe(clientDb.street)
        expect(output.address.number).toBe(clientDb.number)
        expect(output.address.complement).toBe(clientDb.complement)
        expect(output.address.city).toBe(clientDb.city)
        expect(output.address.state).toBe(clientDb.state)
        expect(output.address.zipCode).toBe(clientDb.zipcode)
        expect(output.updatedAt).toEqual(clientDb.createdAt);
        expect(output.createdAt).toEqual(clientDb.updatedAt);
    })
})