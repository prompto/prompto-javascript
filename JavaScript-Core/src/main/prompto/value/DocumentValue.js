import Value from './Value.js'
import { IntegerValue, NullValue, TextValue, SetValue, ListValue } from './index.js'
import { DocumentType, AnyType, TextType } from '../type/index.js'
import { Document, StrictSet } from '../intrinsic/index.js'
import { SyntaxError } from '../error/index.js'
import { equalArrays } from '../utils/index.js'

export default class DocumentValue extends Value {
 
    constructor(values) {
        super(DocumentType.instance);
        this.mutable = true;
        this.values = values || new Document();
    }

    getMemberNames() {
        return Object.getOwnPropertyNames(this.values);
    }

    getStorableData() {
        return this.values;
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

    getMemberValue(context, id, autoCreate) {
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

    declare(transpiler) {
        transpiler.require(Document);
    }

    toJsonNode() {
        const node = {};
        Object.getOwnPropertyNames(this.values).forEach(function(key) {
            const value = this.values[key];
            node[key] = value ? value.toJsonNode() : null;
        }, this);
        return node;
    }

}



