import CategoryType from './CategoryType.ts'
import { TextType, ListType } from '../type'
import { SymbolOfMethodDeclaration } from '../builtins/EnumeratedCategoryTypeBuiltins.ts'
import { SyntaxError } from '../error'

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

    checkMember(context, section, id) {
        if ("name" === id.name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    checkStaticMember(context, section, id) {
        if ("symbols" === id.name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, id);
        }
    }

    declareStaticMember(transpiler, section, id) {
        if("symbols" === id.name) {
            const decl = transpiler.context.getRegisteredDeclaration(this.id);
            transpiler.declare(decl);
        } else
            super.declareStaticMember(transpiler, section, id);
    }

    transpileStaticMember(transpiler, id) {
        if ("symbols" === id.name) {
            transpiler.append(id.name);
        } else {
            return super.transpileStaticMember(transpiler, id);
        }
    }

    getStaticMemberValue(context, id) {
        const decl = context.getRegisteredDeclaration(this.id);
        if (!decl || !decl.symbols) {
            throw new SyntaxError(id.name + " is not an enumerated type!");
        }
        if ("symbols" === id.name) {
            return decl.symbols;
        } else {
            throw new SyntaxError("Unknown member:" + id.name);
        }
    }

    getStaticMemberMethods(context, id) {
        switch (id.name) {
            case "symbolOf":
                return [new SymbolOfMethodDeclaration(this)];
            default:
                return [];
        }
    }
}

