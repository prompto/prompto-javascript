import CategoryType from "./CategoryType"
import { TextType, ListType } from "./index"
import { SymbolOfMethodDeclaration } from "../builtins/EnumeratedCategoryTypeBuiltins"

export default class EnumeratedCategoryType extends CategoryType {
  
    constructor(id) {
        super(id);
    }

    asMutable(context, mutable) {
        if(mutable)
            ; // TODO throw ?
        return this;
    }

    checkExists(context) {
        // TODO
    }

    checkMember(context, section, name) {
        if ("name"==name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, name);
        }
    }

    checkStaticMember(context, section, name) {
        if ("symbols"==name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, name);
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
            return super.transpileStaticMember(transpiler, name);
        }
    }

    getStaticMemberValue(context, name) {
        const decl = context.getRegisteredDeclaration(this.name);
        if (!decl || !decl.symbols) {
            throw new SyntaxError(name + " is not an enumerated type!");
        }
        if ("symbols" == name) {
            return decl.symbols;
        } else {
            throw new SyntaxError("Unknown member:" + name);
        }
    }

    getStaticMemberMethods(context, name) {
        switch (name) {
            case "symbolOf":
                return [new SymbolOfMethodDeclaration(this)];
            default:
                return [];
        }
    }
}

