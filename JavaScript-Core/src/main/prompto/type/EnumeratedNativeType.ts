import BaseType from './BaseType'
import { TextType, ListType } from './index'
import { List } from '../intrinsic'
import { SymbolOfMethodDeclaration } from '../builtins/EnumeratedNativeTypeBuiltins'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import IType from "./IType";
import {TypeFamily} from "../store";
import {EnumeratedNativeDeclaration, IMethodDeclaration} from "../declaration";
import {IValue} from "../value";
import IEnumeratedType from "./IEnumeratedType";

export default class EnumeratedNativeType extends BaseType implements IEnumeratedType {

    derivedFrom: IType;

    constructor(id: Identifier, derivedFrom: IType) {
        super(id, TypeFamily.ENUMERATED);
        this.derivedFrom = derivedFrom;
    }

    checkExists(context: Context): void {
        // TODO
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        if ("value" == member.name) {
            return this.derivedFrom;
        } else if ("name" == member.name) {
            return TextType.instance;
        } else {
            return super.checkMember(context, section, member);
        }
    }

    checkStaticMember(context: Context, section: Section, member: Identifier): IType {
        if ("symbols" == member.name) {
            return new ListType(this);
        } else {
            return super.checkStaticMember(context, section, member);
        }
    }

    isMoreSpecificThan(context: Context, type: IType): boolean {
        return false;
    }

    declare(transpiler: Transpiler): void {
        const decl = transpiler.context.getRegistered(this.id);
        if(decl instanceof EnumeratedNativeDeclaration) {
            transpiler.declare(decl);
            transpiler.require(List);
        }
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    declareMember(transpiler: Transpiler, member: Identifier) {
        if("value" == member.name || "name" == member.name)
            this.declare(transpiler);
        else
            super.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        if ("value" == member.name || "name" == member.name) {
            transpiler.append(member.name);
        } else {
            return super.transpileMember(transpiler, member);
        }
    }

    declareStaticMember(transpiler: Transpiler, member: Identifier): void {
        if("symbols" == member.name)
            this.declare(transpiler);
        else
            super.declareStaticMember(transpiler, member);
    }

    transpileStaticMember(transpiler: Transpiler, member: Identifier) {
        if ("symbols" == member.name) {
            transpiler.append(member.name);
        } else {
            return super.transpileStaticMember(transpiler, member);
        }
    }

    getStaticMemberValue(context: Context, member: Identifier): IValue {
        const decl = context.getRegistered(this.id);
        if(decl instanceof EnumeratedNativeDeclaration) {
            if ("symbols" == member.name)
                return decl.symbols;
            else
                throw new SyntaxError("Unknown member:" + member.name);
        } else
            throw new SyntaxError(this.id.name + " is not an enumerated type!");
     }

    getStaticMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        switch (id.name) {
            case "symbolOf":
                return new Set<IMethodDeclaration>([new SymbolOfMethodDeclaration(this)]);
            default:
                return super.getStaticMemberMethods(context, id);
        }
    }
}


