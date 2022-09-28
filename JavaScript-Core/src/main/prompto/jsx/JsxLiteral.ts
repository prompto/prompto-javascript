import {IType, MethodType, TextType, VoidType} from '../type'
import IJsxValue from "./IJsxValue";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JsxLiteral implements IJsxValue {

    text: string;

    constructor(text: string) {
        this.text = text;
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    checkProto(context: Context, proto: MethodType) {
        return VoidType.instance;
    }

    toString() {
        return this.text;
    }

    isLiteral(context: Context) {
        return true;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
