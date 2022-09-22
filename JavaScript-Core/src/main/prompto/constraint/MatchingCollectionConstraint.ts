import { Identifier } from '../grammar'
import {Context, Transpiler, Variable} from '../runtime'
import { InvalidDataError } from '../error'
import { StrictSet } from '../intrinsic'
import Constraint from "./Constraint";
import {CodeWriter} from "../utils";
import {Expression} from "../expression";
import {Container, Value} from "../value";
import {Type} from "../type";

export default class MatchingCollectionConstraint implements Constraint {

    collection:Expression;
    container?: Container<never>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    transpiler: (transpiler: Transpiler) => void = (t: Transpiler) => {};

    constructor(collection:Expression) {
        this.collection = collection;
    }

    checkValue(context: Context, value: Value): void {
        if(!this.container) {
            const container = this.collection.interpret(context);
            if (container instanceof Container<never>)
                this.container = container as unknown as Container<never>;
            else
                throw new InvalidDataError("Not a collection: " + this.collection.toString());
        }
        if(!this.container.hasValue(context, value))
            throw new InvalidDataError("" + value.toString() + " is not in: " + this.collection.toString());
    }

    toDialect(writer: CodeWriter): void {
        writer.append(" in ");
        this.collection.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    declareChecker(transpiler: Transpiler, name: string, type: Type): void {
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerInstance(new Variable(id, type), true);
        this.collection.declare(transpiler);
        this.transpiler = transpiler => this.transpileChecker(transpiler, name, type);
        transpiler.declare(this);
        transpiler.require(StrictSet);
    }

    transpile(transpiler: Transpiler): void {
        this.transpiler(transpiler);
    }


    transpileChecker(transpiler: Transpiler, name: string, type: Type): void {
        transpiler.append("function $check_").append(name).append("(value) {").indent();
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerInstance(new Variable(id, type), true);
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

