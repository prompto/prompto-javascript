import Value from "./Value";
import {IntegerType} from "../type";

export default class DbIdValue extends Value {

    constructor(value) {
        super(IntegerType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    toJsonNode() {
        return this.value.toString();
    }

    getStorableData() {
        return this.value;
    }

}
