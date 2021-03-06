import { Identifier } from '../grammar/index.js'
import { Variable } from '../runtime/index.js'
import { InvalidDataError } from '../error/index.js'
import { StrictSet } from '../intrinsic/index.js'

export default class MatchingCollectionConstraint {

    constructor(collection) {
        this.collection = collection;
    }

    checkValue(context, value) {
        const container = this.collection.interpret(context);
        if(container.hasItem) {
            if(!(container.hasItem(context, value))) {
                throw new InvalidDataError("" + value.toString() + " is not in: " + this.collection.toString());
            }
        } else {
            throw new InvalidDataError("Not a collection: " + this.collection.toString());
        }
    }

    toDialect(writer) {
        writer.append(" in ");
        this.collection.toDialect(writer);
    }

    declare(transpiler, name, type) {
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerValue(new Variable(id, type));
        this.collection.declare(transpiler);
        this.transpile = function(transpiler) { this.transpileChecker(transpiler, name, type); };
        transpiler.declare(this);
        transpiler.require(StrictSet);
    }

    transpileChecker(transpiler, name, type) {
        transpiler.append("function $check_").append(name).append("(value) {").indent();
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerValue(new Variable(id, type));
        transpiler.append("if(");
        this.collection.transpile(transpiler);
        transpiler.append(".has(value))").indent();
        transpiler.append("return value;").dedent();
        transpiler.append("else").indent();
        transpiler.append("throw new IllegalValueError((value == null ? 'null' : value.toString()) + ' is not in: \"").append(this.collection.toString()).append("\"');").dedent();
        transpiler.dedent().append("}").newLine();
        transpiler.flush();
    }
}

