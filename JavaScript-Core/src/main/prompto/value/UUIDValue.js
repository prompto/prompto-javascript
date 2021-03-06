import Value from './Value.js'
import { TextValue } from './index.js'
import { InvalidDataError } from '../error/index.js'
import { UUID } from '../intrinsic/index.js'
import { UUIDType } from '../type/index.js'

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

    toJsonNode() {
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


