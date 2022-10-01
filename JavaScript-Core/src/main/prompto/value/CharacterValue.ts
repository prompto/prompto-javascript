import BaseValue from "./BaseValue";
import { IntegerValue, TextValue } from '../value'
import { SyntaxError } from '../error'
import { CharacterType } from '../type'
import { removeAccents } from '../utils'
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import IValue from "./IValue";

const whitespace: boolean[] = [];
whitespace[" ".charCodeAt(0)] = true;
whitespace["\t".charCodeAt(0)] = true;
whitespace["\r".charCodeAt(0)] = true;
whitespace["\n".charCodeAt(0)] = true;


export default class CharacterValue extends BaseValue<string> {

    constructor(value: string) {
        super(CharacterType.instance, value);
    }

    static isWhitespace(c: string): boolean {
        return whitespace[c.charCodeAt(0)] || false;
    }

    GetMemberValue(context: Context, member: Identifier): IValue {
        if ("codePoint" == member.name) {
            return new IntegerValue(this.value.charCodeAt(0));
        } else {
            return super.GetMemberValue(context, member);
        }
    }

    toJsonNode() {
        return this.value;
    }

    Add(context: Context, value: IValue) {
        return new TextValue(this.value + value.toString());
    }

    Multiply(context: Context, value: IValue) {
        if (value instanceof IntegerValue) {
            try {
                const text = this.value.repeat(value.value);
                return new TextValue(text);
            } catch(error) {
                throw new SyntaxError("Negative repeat count:" + String(value.value));
            }
        } else {
            throw new SyntaxError("Illegal: Chararacter * " + typeof(value));
        }
    }

    cmp(obj: CharacterValue) {
        return this.value > obj.value ? 1 : this.value == obj.value ? 0 : -1 ;
    }

    compareToValue(context: Context, value: IValue) {
        if(value instanceof TextValue || value instanceof CharacterValue) {
            return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal: Compare CharacterValue with " + typeof(value));
        }
    }

    convertToJavaScript() {
        return this.value;
    }

    getValue() {
        return this.value;
    }

    toString() {
        return this.value;
    }

    equals(obj: any) {
        return obj == this || (obj instanceof CharacterValue && this.value == obj.value);
    }

    Roughly(context: Context, value: IValue) {
        if (value instanceof TextValue || value instanceof CharacterValue) {
            return removeAccents(this.value.toLowerCase()) == removeAccents(value.value.toLowerCase());
        } else {
            return false;
        }
    }
}




