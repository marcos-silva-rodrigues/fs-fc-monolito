import Id from "../value-object/id.value-object";

export default class BaseEntity  {
    private _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Id) {
        this._id = id;

        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    
    public get id() : Id {
        return this._id;
    }

    public get createdAt() : Date {
        return this._createdAt;
    }

    public get updatedAt() : Date {
        return this._updatedAt;
    }

    set updatedAt(updateAt: Date) {
        this._updatedAt = updateAt;
    }
    
}