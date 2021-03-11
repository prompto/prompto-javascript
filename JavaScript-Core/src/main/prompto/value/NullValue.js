import Value from './Value.js'
import { NullType } from '../type/index.js'

export default class NullValue extends Value {

    static init() {
        NullValue.instance = new NullValue();
    }

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

    toJsonNode() {
        return null; // <- YES!
    }

}

