import CategoryParameter from './CategoryParameter';
import { Identifier, IdentifierList } from '../grammar';
import { CodeWriter } from '../utils';
import { IType } from "../type";
import { IParameter } from "./index";
import { Context } from "../runtime";
export default class ExtendedParameter extends CategoryParameter {
    attributes: IdentifierList;
    constructor(id: Identifier, mutable: boolean, type: IType, attributes: IdentifierList);
    getProto(): string;
    equals(obj: IParameter): boolean;
    register(context: Context): void;
    check(context: Context): IType;
    getType(context: Context): IType;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
