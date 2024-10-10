import { Request, Response, Router } from "express"
import { PlaceOrderUseCaseFactory } from "../../../modules/checkout/factory/place-order-usecase.factory";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const productUseCase = PlaceOrderUseCaseFactory.create();

    const input: PlaceOrderInputDto = {
        clientId: req.body.clientId,
        products: req.body.products
    }

    try {
        const output = await productUseCase.execute(input);
        res.status(201).json(output);
    } catch (error) {
        const { message } = error as Error;
        res.status(404).json({
            error: message
        });
    }
});

export const checkoutRouter = router;