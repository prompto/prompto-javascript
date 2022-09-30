import BaseValue from './BaseValue'
import {IntegerValue, CharacterValue, DbIdValue, IIterator} from '../value'
import { TextType } from '../type'
import { SyntaxError, IndexOutOfRangeError, InvalidDataError } from '../error'
import { removeAccents } from '../utils'
import IValue from "./IValue";
import {Context} from "../runtime";

export default class TextValue extends BaseValue<string> {

    constructor(value: string) {
        super(TextType.instance, value);
    }

    getStorableData(): any {
        return this.value;
    }

    toString() {
        return this.value;
    }

    toJsonNode() {
        return this.value;
    }

    Add(context, value) {
        return new TextValue(this.value + value.toString());
    }

    Multiply(context, value) {
        if (value instanceof IntegerValue) {
            try {
                const text = this.value.repeat(value.value);
                return new TextValue(text);
            } catch(error) {
                throw new SyntaxError("Negative repeat count:" + value.value);
            }
        } else {
            throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
        }
    }

    compareToValue(context, value) {
        if(value instanceof TextValue || value instanceof CharacterValue) {
            return this.value > value.value ? 1 : this.value === value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal: Compare TextValue with " + typeof(value));
        }
    }

    hasItem(context, value) {
        if (value instanceof CharacterValue || value instanceof TextValue) {
            return this.value.indexOf(value.value) >= 0;
        } else {
            throw new SyntaxError("Illegal contains: TextValue + " + typeof(value));
        }
    }

    getMemberValue(context, id) {
        if ("count" === id.name) {
            return new IntegerValue(this.value.length);
        } else {
            return super.getMemberValue(context, id);
        }
    }

    getItemInContext(context, index) {
        try {
            if (index instanceof IntegerValue) {
                return new CharacterValue(this.value[index.IntegerValue() - 1]);
            } else {
                throw new InvalidDataError("No such item:" + index.toString());
            }
        } catch (e) {
            if(e instanceof IndexOutOfRangeError) {
                throw e;
            } else {
                throw e;
            }
        }

    }

    getIterator(context: Context): IIterator<CharacterValue> {
        let index = -1;
        return {
            hasNext: () => index < this.value.length - 1,
            next: () => new CharacterValue(this.value[++index])
        }
    }

    convertToJavaScript() {
        return this.value;
    }

    slice(fi, li) {
        const first = this.checkFirst(fi);
        const last = this.checkLast(li);
        return new TextValue(this.value.slice(first - 1, last));
    }

    checkFirst(fi) {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li) {
        let value = (li == null) ? this.value.length : li.IntegerValue();
        if (value < 0) {
            value = this.value.length + 1 + li.IntegerValue();
        }
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    equals(obj) {
        if (obj instanceof TextValue) {
            return this.value === obj.value;
        } else if (obj instanceof DbIdValue) {
            return this.value === obj.value;
        } else {
            return false;
        }
    }

    Roughly(context, obj) {
        if (obj instanceof TextValue || obj instanceof CharacterValue) {
            return removeAccents(this.value.toLowerCase()) === removeAccents(obj.value.toLowerCase());
        } else {
            return false;
        }
    }

    Contains(context, obj) {
        if (obj instanceof TextValue || obj instanceof CharacterValue) {
            return this.value.indexOf(obj.value) >= 0;
        } else {
            return false;
        }
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        if(Array.isArray(json))
            json.push(this.value);
        else
            json[fieldName] = this.value;
    }
}





