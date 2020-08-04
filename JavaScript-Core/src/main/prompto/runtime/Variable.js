var NamedInstance = require("../grammar/NamedInstance").NamedInstance;

class Variable extends NamedInstance {

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

exports.Variable = Variable;
