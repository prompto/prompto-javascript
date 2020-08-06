const BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
const CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
const Identifier = require("../grammar/Identifier").Identifier;
const TextLiteral = require("../literal/TextLiteral").TextLiteral;
const TextType = require("../type/TextType").TextType;
const TextValue = require("../value/TextValue").TextValue;

class BaseJoinMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("join", new CategoryParameter(TextType.instance, new Identifier("delimiter"), new TextLiteral('","')) );
    }

    interpret(context) {
        const items = this.getItems(context);
        const texts = items.map(value => value.toString());
        const delimiter = context.getValue(new Identifier("delimiter")).getStorableData();
        const joined = texts.join(delimiter);
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