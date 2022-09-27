import IValue from "../../../main/prompto/value/IValue.ts";
import { DbIdType } from "../type";

export default class DbIdValue extends IValue {

    constructor(value) {
        super(DbIdType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    toJsonNode() {
        return this.value.toString();
    }

    getStorableData(): any {
        return this.value;
    }

    convertToJavaScript() {
        return this.value;
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        // need a type because value could be a non native JSON type such as UUID
        const value = withType ? { type: DbIdType.instance.name, value: this.value } : this.value;
        if(Array.isArray(json))
            json.push(value);
        else
            json[fieldName] = value;
    }


}
