import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { ListType } from '../type/index.js'
import List from "../intrinsic/List.js"

export default class ToListMethodDeclaration extends BuiltInMethodDeclaration {

    constructor(itemType) {
        super("toList");
        this.itemType = itemType;
    }

    interpret(context) {
        const value = this.getValue(context);
        return value.toListValue(context);
    }

    check(context) {
        return new ListType(this.itemType);
    }

    declareCall(transpiler) {
        transpiler.require(List);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toList()");
    }
}