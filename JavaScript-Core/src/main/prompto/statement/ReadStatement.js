import ReadAllExpression from '../expression/ReadAllExpression.ts'
import { TextType } from '../type'
import {StatementList} from "../statement";

export default class ReadStatement extends ReadAllExpression {

    constructor(source, thenWith) {
        super(source);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line) {
        if(line === this.start.line)
            return this;
        else if(this.thenWith instanceof StatementList)
            return this.thenWith.locateSectionAtLine(line);
        else
            return null;
    }

    canReturn() {
        return false;
    }

    isSimple() {
        return false;
    }

    check(context: Context): IType {
        super.check(context);
        return this.thenWith.check(context, TextType.instance);
    }

    interpret(context: Context): IValue {
        const result = super.interpret(context);
        return this.thenWith.interpret(context, result);
    }

    toDialect(writer: CodeWriter): void {
        super.toDialect(writer);
        this.thenWith.toDialect(writer, TextType.instance);
    }

    declare(transpiler: Transpiler): void {
        super.declare(transpiler);
        this.thenWith.declare(transpiler, TextType.instance);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readFullyAsync(");
        this.thenWith.transpile(transpiler, TextType.instance);
        transpiler.append(");");
         return false;
    }

}

