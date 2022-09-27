import { TextType, VoidType } from '../type'

export default class JsxLiteral {

    constructor(text) {
        this.text = text;
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    checkProto(context, proto) {
        return VoidType.instance;
    }

    toString() {
        return this.text;
    }

    isLiteral(context) {
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
