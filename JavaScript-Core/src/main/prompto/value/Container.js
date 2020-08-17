import Value from "./Value"
import { ListValue } from "./index"
import { AnyType } from "../type/index"

export default class Container extends Value {

    constructor(type) {
        super(type);
        return this;
    }

    toDocumentValue(context) {
        const items = this.items.map(item => {
            item.toDocumentValue(context);
        });
        return new ListValue(AnyType.instance, items);
    }
}