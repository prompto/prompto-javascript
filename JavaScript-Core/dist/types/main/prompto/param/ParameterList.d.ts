import ObjectList from '../utils/ObjectList';
import { IParameter } from './index';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class ParameterList extends ObjectList<IParameter> {
    constructor(...params: IParameter[]);
    register(context: Context): void;
    check(context: Context): void;
    declare(transpiler: Transpiler): void;
    findByName(name: string): IParameter;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
