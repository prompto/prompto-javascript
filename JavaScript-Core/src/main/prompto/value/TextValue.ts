import BaseValue from './BaseValue'
import {IntegerValue, CharacterValue, DbIdValue} from '../value'
import { TextType } from '../type'
import { SyntaxError, IndexOutOfRangeError, InvalidDataError } from '../error'
import {Context} from "../runtime";
import IValue from "./IValue";
import {Identifier} from "../grammar";
import {JsonParent} from "../json";
import {IIterator, removeAccents} from "../intrinsic";

export default class TextValue extends BaseValue<string> {

    constructor(value: string) {
        super(TextType.instance, value);
    }

    getStorableData(): string {
        return this.value;
    }

    toString() {
        return this.value;
    }

    toJsonNode() {
        return this.value;
    }

    Add(context: Context, value: IValue): IValue {
        return new TextValue(this.value + value.toString());
    }

    Multiply(context: Context, value: IValue): IValue {
        if (value instanceof IntegerValue) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const text = this.value.repeat(value.value);
                return new TextValue(text);
            } catch(error) {
                throw new SyntaxError("Negative repeat count:" + String(value.value));
            }
        } else {
            throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
        }
    }

    compareToValue(context: Context, value: IValue) {
        if(value instanceof TextValue || value instanceof CharacterValue) {
            return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal: Compare TextValue with " + typeof(value));
        }
    }

    hasItem(context: Context, value: IValue) {
        if (value instanceof CharacterValue || value instanceof TextValue) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return this.value.indexOf(value.value) >= 0;
        } else {
            throw new SyntaxError("Illegal contains: TextValue + " + typeof(value));
        }
    }

    GetMemberValue(context: Context, member: Identifier): IValue {
        if ("count" == member.name) {
            return new IntegerValue(this.value.length);
        } else {
            return super.GetMemberValue(context, member);
        }
    }

    GetItemValue(context: Context, index: IValue): IValue {
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

    slice(fi: IntegerValue | null, li: IntegerValue | null) {
        const first = this.checkFirst(fi);
        const last = this.checkLast(li);
        return new TextValue(this.value.slice(first - 1, last));
    }

    checkFirst(fi: IntegerValue | null) {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li: IntegerValue | null) {
        let value = (li == null) ? this.value.length : li.IntegerValue();
        if (value < 0) {
            value = this.value.length + 1 + li!.IntegerValue();
        }
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    equals(obj: any) {
        return obj == this || (obj instanceof TextValue && this.value == obj.value)
            || (obj instanceof DbIdValue && this.value == obj.value);
    }

    Roughly(context: Context, value: IValue) {
        if (value instanceof TextValue || value instanceof CharacterValue) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const s: string = value.value;
            return removeAccents(this.value.toLowerCase()) == removeAccents(s.toLowerCase());
        } else {
            return false;
        }
    }

    Contains(context: Context, value: IValue) {
        if (value instanceof TextValue || value instanceof CharacterValue) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return this.value.indexOf(value.value) >= 0;
        } else {
            return false;
        }
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        if(Array.isArray(json))
            json.push(this.value);
        else
            json.set(fieldName, this.value);
    }
}





