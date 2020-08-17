import Value from "./Value"
import { NullType } from "../type/index"

export default class NullValue extends Value {

    constructor() {
        super(NullType.instance);
    }

    toString() {
        return "null";
    }

    getStorableData() {
        return null; // <- YES!
    }

    convertToJavaScript() {
        return null; // <- YES!
    }
}

NullValue.instance = new NullValue();

