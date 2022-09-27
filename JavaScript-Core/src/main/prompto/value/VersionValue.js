import IValue from './IValue.ts'
import {VersionType} from '../type'
import {SyntaxError} from '../error'
import {IntegerValue, TextValue} from "../value";

export default class VersionValue extends IValue {

    constructor(version) {
        super(VersionType.instance);
        this.version = version;
    }

    get major() {
        return this.version.major;
    }

    get minor() {
        return this.version.major;
    }

    get fix() {
        return this.version.major;
    }

    toString() {
        return this.version.toString();
    }

    toJsonNode() {
        return this.version.toString();
    }

    compareToValue(context, value) {
        if (value instanceof VersionValue) {
            return this.version.cmp(value.version);
        } else {
            throw new SyntaxError("Illegal comparison: VersionValue and " + typeof (value));
        }
    }

    equals(obj) {
        if (obj instanceof VersionValue) {
            return this.version.equals(obj.version);
        } else {
            return false;
        }
    }

    getMemberValue(context, id) {
        switch (id.name) {
            case "major":
                return new IntegerValue(this.version.major);
            case "minor":
                return new IntegerValue(this.version.minor);
            case "fix":
                return new IntegerValue(this.version.fix);
            case "qualifier":
                return new TextValue(this.version.qualifierToString());
            default:
                return super.getMemberValue(context, id);
        }
    }

}



