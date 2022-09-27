import BaseType from './BaseType'
import { TextType, ListType } from './index'
import { List } from '../intrinsic'
import { SymbolOfMethodDeclaration } from '../../../main/prompto/builtins/EnumeratedNativeTypeBuiltins'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import IType from "./IType";

export default class EnumeratedNativeType extends BaseType {

    derivedFrom: IType;

    constructor(id: Identifier, derivedFrom: IType) {
        super(id);
        this.derivedFrom = derivedFrom;
    }

    checkExists(context: Context): void {
        // TODO
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("value" === id.name) {
            return this.derivedFrom;
        } else if ("name" === id.name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, id.name);
        }
    }

    checkStaticMember(context: Context, section: Section, id: Identifier): IType {
        if ("symbols" === id.name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, id.name);
        }
    }

    isMoreSpecificThan(context: Context, type: IType): boolean {
        return false;
    }

    declare(transpiler: Transpiler): void {
        const decl = transpiler.context.getRegisteredDeclaration(this.id);
        transpiler.declare(decl);
        transpiler.require(List);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    declareMember(transpiler, section, id) {
        if("value" === id.name || "name" === id.name) {
            const decl = transpiler.context.getRegisteredDeclaration(this.id);
            transpiler.declare(decl);
        } else
            super.declareMember(transpiler, section, id.name);
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        if ("value" === id.name || "name" === id.name) {
            transpiler.append(id.name);
        } else {
            return super.transpileMember(transpiler, id);
        }
    }

    declareStaticMember(context: Context, id: Identifier): void {
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

    getStaticMemberMethods(context: Context, id) {
        switch (id.name) {
            case "symbolOf":
                return [new SymbolOfMethodDeclaration(this)];
            default:
                return super.getStaticMemberMethods(context, id);
        }
    }
}


