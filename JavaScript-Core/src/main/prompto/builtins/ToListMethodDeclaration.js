import BuiltInMethodDeclaration from "../declaration/BuiltInMethodDeclaration"
import { ListType } from "../type/index"

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
        const List = require("../intrinsic/List").List;
        transpiler.require(List);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toList()");
    }
}