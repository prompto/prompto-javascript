import BaseType from './BaseType'
import { DocumentType } from '../type'
import { Identifier } from '../grammar'
import { Document, List } from '../intrinsic'
import {PropertyMap} from "../property";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {IMethodDeclaration} from "../declaration";
import {Section} from "../parser";

/* transient type for holding child property structure */
export default class PropertiesType extends BaseType {

    properties: PropertyMap;

    constructor(properties: PropertyMap) {
        super(new Identifier("Properties"), TypeFamily.PROPERTIES);
        this.properties = properties;
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        if(other instanceof DocumentType)
            return true;
        else
            return super.isAssignableFrom(context, other);
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        const prop = this.properties.get(id.name);
        return prop ? prop.validator.getMethodDeclarations(context) :  super.getMemberMethods(context, id);
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        const prop = this.properties.get(id.name);
        return prop ? prop.validator.getType(context) :  super.checkMember(context, section, id);
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(Document);
        transpiler.register(List);
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        const prop = this.properties.get(member.name);
        if(prop)
            prop.validator.getType(transpiler.context).declare(transpiler);
        else
            super.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        if ("text" === member.name) {
            transpiler.append("getText()");
        } else {
            transpiler.append(member.name);
        }
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        throw new Error('Method not implemented.');
    }

    checkExists(context: Context): void {
        throw new Error('Method not implemented.');
    }

}

