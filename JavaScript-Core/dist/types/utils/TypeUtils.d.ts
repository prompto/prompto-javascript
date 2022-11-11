import { IValue } from '../value';
import { Context } from "../runtime";
import { IExpression } from "../expression";
import { Section } from "../parser";
export declare function convertFromJavaScript(value: any): IValue;
export declare function inferExpressionsType(context: Context, section: Section, expressions: IExpression[]): import("../type").IType;
