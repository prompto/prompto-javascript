import IValue from './IValue.ts'
import { TextValue } from '../value'
import { InvalidDataError } from '../error'
import { UUID } from '../intrinsic'
import { UUIDType } from '../type'

export default class UUIDValue extends IValue {
   
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

    getStorableData(): any {
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


