import Id from "../../@shared/domain/value-object/id.value-object";
import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type InvoiceItemProps = {
    id?: string;
    name: string;
    price: number;
}
export class InvoiceItem implements ValueObject {
    private _id: Id;
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemProps) {
        this._id = new Id(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    get id(): Id {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }
}
