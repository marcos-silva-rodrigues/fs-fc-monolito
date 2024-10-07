import { Request, Response, Router } from "express"
import { ProductRepository } from "../../../modules/product-adm/repository/product.repository";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import { AddProductInputDto } from "../../../modules/product-adm/usecase/add-product/add-product.dto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const respository = new ProductRepository();
    const productUseCase = new AddProductUseCase(respository);

    const input: AddProductInputDto = {
        name: req.body.name,
        description: req.body.description,
        purchasePrice: req.body.purchasePrice,
        stock: req.body.stock,
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

export const productRouter = router;