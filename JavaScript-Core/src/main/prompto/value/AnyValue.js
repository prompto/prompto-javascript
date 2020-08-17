
export default class AnyValue extends Value {

    constructor() {
        super(AnyType.instance);
        this.text = null;
    }

    toString() {
        return "{id:" + this.id + ", text:" + this.text + "}";
    }
}

AnyValue.prototype.constructor = Value;


