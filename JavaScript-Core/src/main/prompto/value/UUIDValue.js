import Value from "./Value"
import { TextValue } from "./index"
import { InvalidDataError } from "../error/index"
import { UUID } from "../intrinsic/index"
import { UUIDType } from "../type/index"

export default class UUIDValue extends Value {
   
    constructor(value) {
        if(typeof(value) == 'string') {
            value = UUID.fromString(value);
        }
        if(!(value instanceof UUID))
            throw new InvalidDataError("Not a UUID: " + typeof(value));
        super(UUIDType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getStorableData() {
        return this.value.toString();
    }

    equals(obj) {
        if (obj instanceof UUIDValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}


export {UUIDValue};


