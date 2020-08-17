export default class EnumeratedNativeType extends BaseType {

    constructor(name, derivedFrom) {
        super(name);
        this.derivedFrom = derivedFrom;
    }

    checkExists(context) {
        // TODO
    }

    checkMember(context, section, name) {
        if ("value"==name) {
            return this.derivedFrom;
        } else if ("name"==name) {
            return TextType.instance;
        } else {
            return BaseType.prototype.checkMember.call(this, context, section, name);
        }
    }

    checkStaticMember(context, section, name) {
        if ("symbols"==name) {
            return new ListType(this);
        } else {
            return BaseType.prototype.checkStaticMember.call(this, context, section, name);
        }
    }

    declare(transpiler) {
        const decl = transpiler.context.getRegisteredDeclaration(this.name);
        transpiler.declare(decl);
        transpiler.require(List);
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    declareMember(transpiler, section, name) {
        if("value"==name || "name"==name) {
            const decl = transpiler.context.getRegisteredDeclaration(this.name);
            transpiler.declare(decl);
        } else
            super.declareMember(transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        if ("value"==name || "name"==name) {
            transpiler.append(name);
        } else {
            return BaseType.prototype.transpileMember.call(this, transpiler, name);
        }
    }

    declareStaticMember(transpiler, section, name) {
        if("symbols"==name) {
            const decl = transpiler.context.getRegisteredDeclaration(this.name);
            transpiler.declare(decl);
        } else
            super.declareStaticMember(transpiler, section, name);
    }

    transpileStaticMember(transpiler, name) {
        if ("symbols"==name) {
            transpiler.append(name);
        } else {
            return BaseType.prototype.transpileStaticMember.call(this, transpiler, name);
        }
    }

    getStaticMemberValue(context, name) {
        const decl = context.getRegisteredDeclaration(this.name);
        if(!decl || !decl.symbols) {
            throw new SyntaxError(name + " is not an enumerated type!");
        }
        if ("symbols"==name) {
            return decl.symbols;
        } else {
            throw new SyntaxError("Unknown member:" + name);
        }
    }

    isAssignableFrom(context, other) {
        return this.id.name === other.id.name;
    }

    getStaticMemberMethods(context, name) {
        switch (name) {
            case "symbolOf":
                const SymbolOfMethodDeclaration = require("../builtins/EnumeratedNativeTypeBuiltins").SymbolOfMethodDeclaration;
                return [new SymbolOfMethodDeclaration(this)];
            default:
                return BaseType.prototype.getStaticMemberMethods.call(this, context, name);
        }
    }
}


