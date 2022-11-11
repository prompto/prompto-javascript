import BaseValue from './BaseValue'
import {VersionType} from '../type'
import {SyntaxError} from '../error'
import {IntegerValue, TextValue} from "../value";
import {Version, equalObjects} from "../intrinsic";
import {Context} from "../runtime";
import IValue from "./IValue";
import {Identifier} from "../grammar";

export default class VersionValue extends BaseValue<Version> {

    constructor(value: Version) {
        super(VersionType.instance, value);
    }

    get major() {
        return this.value.major;
    }

    get minor() {
        return this.value.minor;
    }

    get fix() {
        return this.value.fix;
    }

    toString() {
        return this.value.toString();
    }

    toJsonNode() {
        return this.value.toString();
    }

    compareToValue(context: Context, value: IValue) {
        if (value instanceof VersionValue) {
            return this.value.cmp(value.value);
        } else {
            throw new SyntaxError("Illegal comparison: VersionValue and " + typeof (value));
        }
    }

    equals(obj: any) {
        return obj == this || (obj instanceof VersionValue && equalObjects(this.value, obj.value));
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch (member.name) {
            case "major":
                return new IntegerValue(this.value.major);
            case "minor":
                return new IntegerValue(this.value.minor);
            case "fix":
                return new IntegerValue(this.value.fix);
            case "qualifier":
                return new TextValue(this.value.qualifierToString());
            default:
                return super.GetMemberValue(context, member);
        }
    }

}



