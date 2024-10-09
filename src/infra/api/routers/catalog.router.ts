import { Request, Response, Router } from "express"
import { AddProductInputDto } from "../../../modules/store-catalog/usecase/add-product/add-product.dto";
import AddProductUseCase from "../../../modules/store-catalog/usecase/add-product/add-product.usecase";
import ProductRepository from "../../../modules/store-catalog/repository/product.repository";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const respository = new ProductRepository();
    const productUseCase = new AddProductUseCase(respository);

    const input: AddProductInputDto = {
        name: req.body.name,
        description: req.body.description,
        salesPrice: req.body.salesPrice,
    }

    if (req.body.id) {
        input.id = req.body.id;
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

export const catalogRouter = router;