import JsxElementBase from './JsxElementBase';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { JsxClosing, JsxExpression, JsxProperty } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import IJsxExpression from "./IJsxExpression";
export default class JsxElement extends JsxElementBase {
    children?: IJsxExpression[];
    closing?: JsxClosing;
    nameSuite: string | null;
    openingSuite: string | null;
    constructor(id: Identifier, nameSuite: string | null, attributes: JsxProperty[], openingSuite: string | null);
    setChildren(children: JsxExpression[]): this;
    setClosing(closing: JsxClosing): this;
    check(context: Context): IType;
    toDialect(writer: CodeWriter): void;
    declareChildren(transpiler: Transpiler): void;
    transpileChildren(transpiler: Transpiler): void;
}
