import NamedInstance from '../grammar/NamedInstance'
import {Identifier} from "../grammar";
import {IType} from "../type";
import {Context, Transpiler} from "./index";

export default class Variable extends NamedInstance {

    type: IType;

    constructor(id: Identifier, type: IType) {
        super(id);
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

    getType(context: Context) {
        return this.type;
    }
}

