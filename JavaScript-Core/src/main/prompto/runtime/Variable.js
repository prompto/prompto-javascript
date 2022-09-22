import NamedInstance from '../../../main/prompto/grammar/NamedInstance.ts'

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

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    getType(context) {
        return this.type;
    }
}

