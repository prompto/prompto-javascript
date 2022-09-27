import BaseValue from './BaseValue'
import { IntegerValue, NullValue, TextValue, SetValue, ListValue } from './index'
import { DocumentType, AnyType, TextType } from '../type'
import { Document, StrictSet } from '../intrinsic'
import { SyntaxError } from '../error'
import { equalArrays } from '../utils'
import {JsonNode, JsonObject, JsonParent} from '../json'
import {Context, Transpiler} from '../runtime'
import {Identifier} from "../grammar";
import IValue from "../../../main/prompto/value/IValue";

export default class DocumentValue extends BaseValue<Document> {

    constructor(values?: Document) {
        super(DocumentType.instance, values || new Document());
        this.mutable = true;
    }

    getMemberNames(): string[] {
        return Object.getOwnPropertyNames(this.value);
    }

    getStorableData(): any {
        return this.value;
    }

    convertToJavaScript() {
        const values = new Document();
        Object.getOwnPropertyNames(this.values).forEach(function(key) {
            const value = this.values[key];
            values[key] = value.convertToJavaScript();
        }, this);
        return values;
    }

    hasMember(name) {
        return this.values.hasOwnProperty(name);
    }

    getMemberValue(context: Context, id: Identifier, autocreate?: boolean): IValue {
        switch(id.name) {
            case "count":
                return new IntegerValue(this.values.$safe_length);
            case "keys": {
                const keys = new StrictSet();
                this.getMemberNames().forEach(name => {
                    keys.add(new TextValue(name));
                });
                return new SetValue(TextType.instance, keys);
            }
            case "values": {
                const list = this.getMemberNames().map(function (name) {
                    return this.values[name];
                }, this);
                return new ListValue(AnyType.instance, list);
            }
            case "json":
                return super.getMemberValue(context, id, autoCreate);
            default:
                if (this.values.hasOwnProperty(id.name))
                    return this.values[id.name] || null;
                else if ("text" === id.name)
                    return new TextValue(this.toString());
                else if (autoCreate) {
                    const result = new DocumentValue();
                    this.values[id.name] = result;
                    return result;
                } else
                    return NullValue.instance;
        }
    }

    setMember(context, name, value) {
        this.values[name] = value;
    }

    getItemInContext(context, index) {
        if (index instanceof TextValue) {
            // TODO autocreate
            return this.values[index.value] || NullValue.instance;
        } else {
            throw new SyntaxError("No such item:" + index.toString())
        }
    }

    setItemInContext(context, index, value) {
        if (index instanceof TextValue) {
            this.values[index.value] = value
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    Add(context, value) {
        if (value instanceof DocumentValue) {
            return new DocumentValue(this.values.$safe_add(value.values));
        } else {
            throw new SyntaxError("Illegal: Document + " + typeof(value));
        }
    }

    equals(other) {
        if(this===other)
            return true;
        if(!(other instanceof DocumentValue))
            return false;
        const thisNames = Object.getOwnPropertyNames(this.values);
        const otherNames = Object.getOwnPropertyNames(other.values);
        if(!equalArrays(thisNames, otherNames))
            return false;
        return thisNames.every(function(name) {
            return this.values[name].equals(other.values[name]);
        }, this);
    }

    toString() {
        const binaries = {};
        // create json type-aware object graph and collect binaries
        const values = {}; // need a temporary parent
        for (const key in this.values) {
            const value = this.values[key];
            if(typeof(value) === 'function')
                continue;
            if (value === null || value === undefined)
                values[key] = null;
            else {
                const id = this; // TODO create identifier
                value.toJson(null, values, id, key, false, binaries);
            }
        }
        return JSON.stringify(values);
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        const values = {};
        Object.getOwnPropertyNames(this.values).forEach(function(key) {
            const value = this.values[key];
            if (value === null || value === undefined)
                values[key] = null;
            else {
                const id = this; // TODO create identifier
                value.toJson(context, values, id, key, withType, binaries);
            }
        }, this);
        const doc = withType ? { type: DocumentType.instance.name, value: values} : values;
        if(Array.isArray(json))
            json.push(doc);
        else
            json[fieldName] = doc;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Document);
    }

    toJsonNode(): JsonObject {
        const node = new Map<string, JsonNode>();
        Object.getOwnPropertyNames(this.value).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const value = this.value[key] || null;
            node.set(key, value instanceof BaseValue ? value.toJsonNode() : null);
        }, this);
        return node;
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        throw new Error('Method not implemented.')
    }


}



