import Value from './Value.js'
import { TypeType } from "../type/index.js";

export default class TypeValue extends Value {
  
    constructor(value) {
        super(new TypeType(value));
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getMemberValue(context, name, autoCreate) {
        return this.value.getStaticMemberValue(context, name);
    }
}

