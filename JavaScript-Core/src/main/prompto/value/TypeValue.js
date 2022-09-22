import Value from './Value.ts'
import { TypeType } from "../type";

export default class TypeValue extends Value {
  
    constructor(value) {
        super(new TypeType(value));
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getMemberValue(context, id, autoCreate) {
        return this.value.getStaticMemberValue(context, id);
    }
}

