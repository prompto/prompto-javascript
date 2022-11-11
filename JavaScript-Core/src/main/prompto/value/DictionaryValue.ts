import BaseValue from './BaseValue'
import {TextValue, IntegerValue, SetValue, NullValue, ListValue, IValue} from './index'
import {AnyType, DictionaryType, IType, TextType} from '../type'
import {Dictionary, IIterator, equalObjects} from '../intrinsic'
import { SyntaxError } from '../error'
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {JsonNode} from "../json";
import {KVP} from "../intrinsic/Dictionary";

export default class DictionaryValue extends BaseValue<Dictionary<TextValue, IValue>> {
 
    constructor(itemType: IType, mutable?: boolean, dict?: Dictionary<TextValue, IValue>) {
        super(new DictionaryType(itemType), dict || new Dictionary(mutable || false), mutable || false);
    }

    toString() {
        return this.value.toString();
    }

    isEmpty() {
        return this.value.isEmpty();
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof DictionaryValue) {
            const dict = new Dictionary<TextValue, IValue>();
            dict.add(this.value);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            dict.add(value.value);
            return new DictionaryValue((this.type as DictionaryType).itemType, false, dict);
        } else {
            throw new SyntaxError("Illegal: Dict + " + typeof(value));
        }
    }

    hasItem(context: Context, value: IValue) {
        if (value instanceof TextValue) {
            return value.value in this.value;
        } else {
            throw new SyntaxError("Only TextValue key type supported by DictionaryValue");
        }
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch(member.name) {
            case "count":
                return new IntegerValue(this.value.length);
            case "json":
                return super.GetMemberValue(context, member);
            case "keys":
                return this.getKeysValue();
            case "values":
                return this.getValuesValue();
            default:
                return super.GetMemberValue(context, member);
        }
    }

    private getKeysValue() {
        return new SetValue(TextType.instance, this.value.$keys);
    }


    private getValuesValue() {
        return new ListValue((this.type as DictionaryType).itemType, false, this.value.$values);
    }

    SetItemValue(context: Context, index: IValue, value: IValue) {
        if (index instanceof TextValue) {
            this.value.setItem(index, value);
        } else
            throw new SyntaxError("No such item:" + index.toString())
    }

    GetItemValue(context: Context, index: IValue) {
        if (index instanceof TextValue) {
            return this.value.getItem(index) || NullValue.instance;
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    convertToJavaScript() {
        const dict = new Dictionary<string, any>();
        this.value.$entries.forEach(entry => dict.setItem(entry.key.convertToJavaScript(), entry.value.convertToJavaScript()));
        return dict;
    }

    equals(obj: any) {
        return obj == this || (obj instanceof DictionaryValue && equalObjects(this.value, obj.value));
    }

    getIterator(context: Context): IIterator<IValue> {
        const iterator = this.value.iterator();
        return {
            hasNext: () => iterator.hasNext(),
            next: () => new KVPValue(iterator.next())
        };
    }

    swap(context: Context) {
        const swapped = new Dictionary<TextValue, IValue>(true);
        const iter = this.value.iterator();
        while(iter.hasNext()) {
            const entry = iter.next();
            let key = entry.value;
            if(!(key instanceof TextValue))
                key = new TextValue(key.toString());
            swapped.setItem(key as TextValue, entry.key);
        }
        swapped.mutable = false;
        return new DictionaryValue(TextType.instance, false, swapped);
    }

    removeItem(key: IValue) {
        if(key instanceof TextValue)
            this.value.removeItem(key);
    }


    removeValue(value: IValue) {
        this.value.removeValue(value);
    }

    toJsonNode(): JsonNode {
        const map = new Map<string, JsonNode>();
        this.value.$entries.forEach(entry => map.set(entry.key.value, entry.value.toJsonNode()));
        return map;

    }

}

class KVPValue extends BaseValue<KVP<TextValue, IValue>> {

    constructor(kvp: KVP<TextValue, IValue>) {
        super(AnyType.instance, kvp); // TODO check that this is safe
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch(member.name) {
            case "key":
                return this.value.key;
            case "value":
                return this.value.value;
            default:
                return super.GetMemberValue(context, member);
        }
    }
}

