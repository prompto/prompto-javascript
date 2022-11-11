import ObjectList from '../utils/ObjectList';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
import { Section } from "../parser";
export default class ExpressionList extends ObjectList<IExpression> {
    constructor(items?: IExpression[], item?: IExpression);
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
