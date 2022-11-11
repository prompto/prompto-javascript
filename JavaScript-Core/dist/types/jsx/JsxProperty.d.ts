import Section from '../parser/Section';
import { IType, MethodType } from '../type';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import IJsxValue from "./IJsxValue";
import { CodeWriter } from "../utils";
export default class JsxProperty extends Section {
    id: Identifier;
    value: IJsxValue;
    suite: string | null;
    constructor(id: Identifier, value: IJsxValue, suite: string | null);
    check(context: Context): IType;
    checkProto(context: Context, proto: MethodType): IType;
    declareProto(transpiler: Transpiler, proto: MethodType): void;
    transpileProto(transpiler: Transpiler, proto: MethodType): void;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
