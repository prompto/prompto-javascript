var Literal = require("./Literal").Literal;
var TypeType = require("../type/TypeType").TypeType;
var TypeValue = require("../value/TypeValue").TypeValue;
var Dialect = require("../parser/Dialect").Dialect;
var Type = require("../intrinsic/Type").Type;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;

class TypeLiteral extends Literal {
  
    constructor(type) {
        super(type.toString(), type);
    }

    check(context) {
        return new TypeType(this.value);
    }

    interpret(context) {
        return new TypeValue(this.value);
    }

    toDialect(writer) {
        if(writer.dialect==Dialect.E) {
            var decl = writer.context.getRegisteredDeclaration(this.value.id);
            if(decl instanceof MethodDeclarationMap)
                writer.append("Method: ");
            else
                writer.append("Type: ");
        }
        this.value.toDialect(writer);
    }

    parentToDialect(writer) {
        this.value.toDialect(writer);
    }

    declare(transpiler) {
        transpiler.require(Type);
    }

    transpile(transpiler) {
        transpiler.append("new Type('").append(this.value.toString()).append("')");
        return false;
    }

    declareParent(transpiler) {
        this.value.declare(transpiler);
    }

    transpileParent(transpiler) {
        transpiler.append(this.value.toString());
        return false;
    }
}


exports.TypeLiteral = TypeLiteral;