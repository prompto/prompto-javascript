import BaseType from './BaseType'
import { TextType } from './index'
import { Identifier } from '../grammar'
import IType from "./IType";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";

export default class EntryType extends BaseType {

    itemType: IType;

    constructor(itemType: IType) {
        super(new Identifier(itemType.name + "{}[]"), TypeFamily.MISSING);
        this.itemType = itemType;
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        if ("key" === member.name) {
            return TextType.instance;
        } else if ("value" === member.name) {
            return this.itemType;
        } else {
            return super.checkMember(context, section, member);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if ("key" === member.name)
            return;
        else if ("value" === member.name)
            this.itemType.declare(transpiler);
        else
            return super.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        transpiler.append(member.name);
    }

    checkExists(context: Context): void {
        // nothing to do
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        return other instanceof EntryType ? this.itemType.isMoreSpecificThan(context, other.itemType) : false;
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
    }
}
