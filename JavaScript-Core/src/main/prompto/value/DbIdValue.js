import Value from "./Value";
import { DbIdType } from "../type";

export default class DbIdValue extends Value {

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

    getStorableData() {
        return this.value;
    }

    convertToJavaScript() {
        return this.value;
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        const value = withType ? { type: DbIdType.instance.name, value: this.value } : this.value;
        if(Array.isArray(json))
            json.push(value);
        else
            json[fieldName] = value;
    }


}
