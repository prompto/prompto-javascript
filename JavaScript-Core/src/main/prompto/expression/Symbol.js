
export default class Symbol extends Expression {

    constructor(id) {
        super();
        this.id = id;
        this.mutable = false;
    }

    get name() {
        return this.id.name;
    }

    register(context) {
        context.registerValue(this);
    }

    unregister(context) {
        context.unregisterValue(this);
    }

    getStorableData() {
        return this.id.name;
    }

    collectStorables(storables) {
        // nothing to do
    }

    equals(value) {
        return value instanceof Symbol && this.name === value.name;
    }
}
