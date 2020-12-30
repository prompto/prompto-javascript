import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { SetType } from '../type/index.js'
import StrictSet from "../intrinsic/StrictSet.js"

export default class ToSetMethodDeclaration extends BuiltInMethodDeclaration {

    constructor(itemType) {
        super("toSet");
        this.itemType = itemType;
    }

    interpret(context) {
        const value = this.getValue(context);
        return value.toSetValue(context);
    }

    check(context) {
        return new SetType(this.itemType);
    }

    declareCall(transpiler) {
        transpiler.require(StrictSet);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toSet()");
    }
}