import { Request, Response, Router } from "express"
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find/find-invoice.usecase";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";

const router = Router();

router.post("/:id", async (req: Request, res: Response) => {
    const repository = new InvoiceRepository();
    const findInvoice = new FindInvoiceUseCase(repository);

    const input = {
        id: req.params["id"] as string
    }

    try {
        const output = await findInvoice.execute(input);
        res.status(200).json(output);
    } catch (error) {
        const { message } = error as Error;
        res.status(404).json({
            error: message
        });
    }
});

export const invoiceRouter = router;