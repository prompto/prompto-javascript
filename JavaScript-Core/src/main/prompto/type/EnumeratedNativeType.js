import BaseType from './BaseType.js'
import { TextType, ListType } from './index.js'
import { List } from '../intrinsic/index.js'
import { SymbolOfMethodDeclaration } from '../builtins/EnumeratedNativeTypeBuiltins.js'
import { SyntaxError } from '../error/index.js'

export default class EnumeratedNativeType extends BaseType {

    constructor(name, derivedFrom) {
        super(name);
        this.derivedFrom = derivedFrom;
    }

    checkExists(context) {
        // TODO
    }

    checkMember(context, section, id) {
        if ("value" === id.name) {
            return this.derivedFrom;
        } else if ("name" === id.name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, id.name);
        }
    }

    checkStaticMember(context, section, id) {
        if ("symbols" === id.name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, id.name);
        }
    }

    isMoreSpecificThan(context, type) {
        return false;
    }

    declare(transpiler) {
        const decl = transpiler.context.getRegisteredDeclaration(this.id);
        transpiler.declare(decl);
        transpiler.require(List);
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    declareMember(transpiler, section, id) {
        if("value" === id.name || "name" === id.name) {
            const decl = transpiler.context.getRegisteredDeclaration(this.id);
            transpiler.declare(decl);
        } else
            super.declareMember(transpiler, section, id.name);
    }

    transpileMember(transpiler, id) {
        if ("value" === id.name || "name" === id.name) {
            transpiler.append(id.name);
        } else {
            return super.transpileMember(transpiler, id);
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
        if(!decl || !decl.symbols) {
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
                return super.getStaticMemberMethods(context, id);
        }
    }
}


