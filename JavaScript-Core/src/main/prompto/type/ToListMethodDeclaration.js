var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var ListType = require("./ListType").ListType;

class ToListMethodDeclaration extends BuiltInMethodDeclaration {
    constructor(itemType) {
        super("toList");
        this.itemType = itemType;
        return this;
    }

    interpret(context) {
        var value = this.getValue(context);
        return value.toListValue(context);
    }

    check(context) {
        return new ListType(this.itemType);
    }

    declareCall(transpiler) {
        var List = require("../intrinsic/List").List;
        transpiler.require(List);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toList()");
    }
}

exports.ToListMethodDeclaration = ToListMethodDeclaration;