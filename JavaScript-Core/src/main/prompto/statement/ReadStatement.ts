import ReadAllExpression from '../expression/ReadAllExpression'
import {IType, TextType} from '../type'
import {IExpression} from "../expression";
import {ThenWith} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class ReadStatement extends ReadAllExpression {

    thenWith: ThenWith;

    constructor(source: IExpression, thenWith: ThenWith) {
        super(source);
        this.thenWith = thenWith;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line == this.startLocation.line)
            return this;
        else if(this.thenWith)
            return this.thenWith.statements.locateSectionAtLine(line);
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    interpretExpression(context: Context): IValue | null {
        const result = super.interpretExpression(context);
        this.thenWith.interpret(context, result);
        return null;
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
    }

}

