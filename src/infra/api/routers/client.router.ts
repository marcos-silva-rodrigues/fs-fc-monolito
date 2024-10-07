import { Request, Response, Router } from "express"
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientRepository from "../../../modules/client-adm/repository/client.respository";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import Address from "../../../modules/@shared/domain/value-object/address";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const respository = new ClientRepository();
    const clientUseCase = new AddClientUseCase(respository);

    const input: AddClientInputDto = {
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        address: new Address(
            req.body.street,
            req.body.number,
            req.body.complement,
            req.body.city,
            req.body.state,
            req.body.zipCode,
        )
    }

    try {
        const output = await clientUseCase.execute(input);
        res.status(201).json(output);
    } catch (error) {
        const { message } = error as Error;
        res.status(404).json({
            error: message
        });
    }
});

export const clientRouter = router;