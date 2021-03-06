import NamedInstance from '../grammar/NamedInstance.js'

export default class Variable extends NamedInstance {

    constructor(id, type) {
        super();
        this.id = id;
        this.type = type;
     }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.name;
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    getType(context) {
        return this.type;
    }
}

