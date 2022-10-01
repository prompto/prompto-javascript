import CategoryType from './CategoryType'
import { TextType, ListType } from '../type'
import { SymbolOfMethodDeclaration } from '../builtins/EnumeratedCategoryTypeBuiltins'
import { SyntaxError } from '../error'
import {TypeFamily} from "../store";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import IType from "./IType";
import BaseDeclaration from "../declaration/BaseDeclaration";
import {EnumeratedCategoryDeclaration, IMethodDeclaration} from "../declaration";
import {IValue} from "../value";
import IEnumeratedType from "./IEnumeratedType";

export default class EnumeratedCategoryType extends CategoryType implements IEnumeratedType {
  
    constructor(id: Identifier) {
        super(id, false, TypeFamily.ENUMERATED);
    }

    asMutable(context: Context, mutable: boolean) {
        if(mutable)
            throw new Error("Should never get there!");
        return this;
    }

    checkExists(context: Context) {
        // TODO
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("name" === id.name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    checkStaticMember(context: Context, section: Section, member: Identifier): IType {
        if ("symbols" === member.name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, member);
        }
    }

    declareStaticMember(transpiler: Transpiler, member: Identifier): void {
        if("symbols" === member.name) {
            const decl = transpiler.context.getRegistered(this.id);
            if(decl instanceof BaseDeclaration)
                transpiler.declare(decl);
        } else
            super.declareStaticMember(transpiler, member);
    }

    transpileStaticMember(transpiler: Transpiler, member: Identifier) {
        if ("symbols" === member.name) {
            transpiler.append(member.name);
        } else {
            return super.transpileStaticMember(transpiler, member);
        }
    }

    getStaticMemberValue(context: Context, member: Identifier): IValue {
        const decl = context.getRegistered(this.id);
        if(decl instanceof EnumeratedCategoryDeclaration) {
            if ("symbols" == member.name)
                return decl.symbols;
            else
                throw new SyntaxError("Unknown member:" + member.name);
        } else
            throw new SyntaxError(member.name + " is not an enumerated type!");
    }

    getStaticMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration> {
        switch (member.name) {
            case "symbolOf":
                return new Set<IMethodDeclaration>([new SymbolOfMethodDeclaration(this)]);
            default:
                return new Set<IMethodDeclaration>();
        }
    }
}

