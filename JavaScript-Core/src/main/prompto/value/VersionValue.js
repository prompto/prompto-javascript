import Value from './Value.js'
import { VersionType } from '../type/index.js'
import { SyntaxError } from '../error/index.js'

export default class VersionValue extends Value {

    constructor(version) {
        super(VersionType.instance);
        this.version = version;
    }

    get major() { return this.version.major; }
    get minor() { return this.version.major; }
    get fix() { return this.version.major; }

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
            throw new SyntaxError("Illegal comparison: VersionValue and " + typeof(value));
        }
    }

    equals(obj) {
        if (obj instanceof VersionValue) {
            return this.version.equals(obj.version);
        } else {
            return false;
        }
    }
}



