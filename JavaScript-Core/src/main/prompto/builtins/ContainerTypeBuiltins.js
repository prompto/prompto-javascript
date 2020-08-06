var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var Identifier = require("../grammar/Identifier").Identifier;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;

class BaseJoinMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("join", new CategoryParameter(TextType.instance, new Identifier("delimiter"), new TextLiteral('","')) );
    }

    interpret(context) {
        var items = this.getItems(context);
        var texts = items.map(value => value.toString());
        var delimiter = context.getValue(new Identifier("delimiter")).getStorableData();
        var joined = texts.join(delimiter);
        return new TextValue(joined);
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("join(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

class JoinListMethodDeclaration extends BaseJoinMethodDeclaration {

    constructor() {
        super();
    }

    getItems(context) {
        return this.getValue(context).items;
    }
}

class JoinSetMethodDeclaration extends BaseJoinMethodDeclaration {
    constructor() {
        super();
        return this;
    }

    getItems(context) {
        return Array.from(this.getValue(context).items.set);
    }
}

class JoinTupleMethodDeclaration extends BaseJoinMethodDeclaration {

    constructor() {
        super();
    }

    getItems(context) {
        return this.getValue(context).items;
    }
}


exports.JoinListMethodDeclaration = JoinListMethodDeclaration;
exports.JoinSetMethodDeclaration = JoinSetMethodDeclaration;
exports.JoinTupleMethodDeclaration = JoinTupleMethodDeclaration;