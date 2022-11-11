import ThisExpression from './ThisExpression';
import { IType } from '../type';
import { Context, Transpiler } from '../runtime';
import { CodeWriter } from "../utils";
export default class SuperExpression extends ThisExpression {
    check(context: Context): IType;
    getSuperType(context: Context): IType;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
