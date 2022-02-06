import Value from './Value.js'
import { IntegerValue, TextValue } from './index.js'
import { SyntaxError } from '../error/index.js'
import { CharacterType } from '../type/index.js'
import { removeAccents } from '../utils/index.js'


export default class CharacterValue extends Value {

    constructor(value) {
        super(CharacterType.instance);
        this.value = value;
    }

    static isWhitespace(c) {
        return !!whitespace[c.charCodeAt(0)];
    }

    getMemberValue(context, id) {
        if ("codePoint" === id.name) {
            return new IntegerValue(this.value.charCodeAt(0));
        } else {
            return super.getMemberValue(context, id);
        }
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

    cmp(obj) {
        return this.value > obj.value ? 1 : this.value == obj.value ? 0 : -1 ;
    }

    compareToValue(context, value) {
        if(value instanceof TextValue || value instanceof CharacterValue) {
            return this.value > value.value ? 1 : this.value == value.value ? 0 : -1;
        } else {
            throw new SyntaxError("Illegal: Compare CharacterValue with " + typeof(value));
        }
    }

    convertToJavaScript() {
        return this.value;
    }

    toString() {
        return this.value;
    }

    equals(obj) {
        if (obj instanceof CharacterValue) {
            return this.value == obj.value;
        } else {
            return false;
        }
    }

    Roughly(context, obj) {
        if (obj instanceof TextValue || obj instanceof CharacterValue) {
            return removeAccents(this.value.toLowerCase()) == removeAccents(obj.value.toLowerCase());
        } else {
            return false;
        }
    }
}

const whitespace = [];
whitespace[" ".charCodeAt(0)] = true;
whitespace["\t".charCodeAt(0)] = true;
whitespace["\r".charCodeAt(0)] = true;
whitespace["\n".charCodeAt(0)] = true;



