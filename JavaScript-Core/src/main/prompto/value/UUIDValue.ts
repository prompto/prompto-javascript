import BaseValue from './BaseValue'
import { TextValue } from '../value'
import { UUID } from '../intrinsic'
import { UUIDType } from '../type'
import {equalObjects} from "../utils";
import {Context} from "../runtime";

export default class UUIDValue extends BaseValue<UUID> {
   
    constructor(value: UUID | string) {
        if(typeof(value) == 'string')
            value = UUID.fromString(value);
        super(UUIDType.instance, value);
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

    equals(obj: any) {
        return obj == this || (obj instanceof UUIDValue && equalObjects(this.value, obj.value));
    }

    toDocumentValue(context: Context) {
        return new TextValue(this.toString());
    }
}



