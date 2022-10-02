import BaseValue from './BaseValue'
import { IValue, IntegerValue, NullValue, TextValue, SetValue, ListValue } from './index'
import { DocumentType, AnyType, TextType } from '../type'
import { Document, StrictSet } from '../intrinsic'
import { SyntaxError } from '../error'
import { equalObjects } from '../utils'
import {JsonNode, JsonObject, JsonParent} from '../json'
import {Context, Transpiler} from '../runtime'
import {Identifier} from "../grammar";

export default class DocumentValue extends BaseValue<Document<string, IValue>> {

    constructor(values?: Document<string, IValue>) {
        super(DocumentType.instance, values || new Document<string, IValue>());
        this.mutable = true;
    }

    getMemberNames(): string[] {
        return this.value.$user_keys;
    }

    getStorableData(): any {
        return this.value;
    }

    convertToJavaScript() {
        const values = new Document<string, IValue>();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.getMemberNames().forEach(key => values.$safe_setMember(key, this.value.$safe_getMember(key)!.convertToJavaScript()), this);
        return values;
    }

    hasMember(name: string) {
        return this.value.hasOwnProperty(name);
    }

    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue {
        switch(member.name) {
            case "count":
                return new IntegerValue(this.value.$safe_length);
            case "keys":
                return this.getMemberKeys();
            case "values":
                return this.getMemberValues();
            case "json":
                if(!this.value.hasOwnProperty("json"))
                    return super.GetMemberValue(context, member, autoCreate);
                // eslint-disable-next-line no-fallthrough
            default:
                return this.getMemberValue(member.name, autoCreate);
        }
    }

    getMemberValue(member: string, autoCreate?: boolean): IValue {
        if (this.value.hasOwnProperty(member))
            return this.value.$safe_getMember(member) || NullValue.instance;
        else if ("text" == member)
            return new TextValue(this.toString());
        else if (autoCreate) {
            const result = new DocumentValue();
            this.value.$safe_setMember(member, result);
            return result;
        } else
            return NullValue.instance;
    }

    getMemberValues(): ListValue {
        return new ListValue(AnyType.instance, false, this.value.$safe_values);
    }

    getMemberKeys() {
        const keys = this.value.$user_keys.map(key => new TextValue(key));
        return new SetValue(TextType.instance, new StrictSet<TextValue>(keys));

    }

    setMember(context: Context, name: string, value: IValue) {
        this.value.$safe_setMember(name, value);
    }

    GetItemValue(context: Context, index: IValue) {
        if (index instanceof TextValue) {
            // TODO autocreate
            return this.value.$safe_getMember(index.value) || NullValue.instance;
        } else {
            throw new SyntaxError("No such item:" + index.toString())
        }
    }

    SetItemValue(context: Context, index: IValue, value: IValue) {
        if (index instanceof TextValue) {
            this.value.$safe_setMember(index.value, value);
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof DocumentValue) {
            return new DocumentValue(this.value.$safe_add(value.value));
        } else {
            throw new SyntaxError("Illegal: Document + " + typeof(value));
        }
    }

    equals(other: any) {
        return other==this || (other instanceof DocumentValue && equalObjects(this.value, other.value));
    }

    toString() {
        return this.value.toString();
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        let values = new Map<string, any>();
        this.getMemberNames().forEach(key => {
            const value = this.value.$safe_getMember(key);
            if (value == null || value == NullValue.instance)
                values.set(key, null);
            else {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const id = this; // TODO create identifier
                value.toJsonStream(context, values, id, key, withType, binaries);
            }
        }, this);
        if(withType) {
            const doc = new Map<string, any>();
            doc.set("type", DocumentType.instance.name);
            doc.set("value", values);
            values = doc;
        }
        if(Array.isArray(json))
            json.push(values);
        else
            json.set(fieldName, values);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Document);
    }

    toJsonNode(): JsonObject {
        const map = new Map<string, JsonNode>();
        this.getMemberNames().forEach(key => {
            const value = this.value.$safe_getMember(key) || null;
            if(value == null)
                map.set(key, null);
            else
                map.set(key, value.toJsonNode());
        }, this);
        return map;
    }

}



