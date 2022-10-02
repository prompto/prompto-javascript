import BaseStatement from './BaseStatement'
import {Context, ResourceContext, Transpiler} from '../runtime'
import {VoidType, ResourceType, TextType, IType} from '../type'
import {IValue, TextValue} from '../value'
import { NullReferenceError, InvalidResourceError } from '../error'
import {ThenWith} from "../grammar";
import {IExpression} from "../expression";
import {Section} from "../parser";
import {CodeWriter} from "../utils";

export default class WriteStatement extends BaseStatement {

    content: IExpression;
    resource: IExpression;
    thenWith: ThenWith | null;

    constructor(content: IExpression, resource: IExpression, thenWith: ThenWith | null) {
        super();
        this.content = content;
        this.resource = resource;
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

    isSimple() {
        return !this.thenWith;
    }

    toString() {
        return "write " + this.content.toString() + " to " + this.resource.toString();
    }

    check(context: Context): IType {
        context = context instanceof ResourceContext ? context : context.newResourceContext();
        const resourceType = this.resource.check(context);
        if(!(resourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource.asSection() || this);
        if(this.thenWith)
            return this.thenWith.check(context, TextType.instance);
        else
            return VoidType.instance;
    }

    interpretStatement(context: Context): IValue | null {
        const resContext = context instanceof ResourceContext ? context : context.newResourceContext();
        const value = this.resource.interpretExpression(resContext);
        if(!value)
            throw new NullReferenceError();
        if(!value.isResource())
            throw new InvalidResourceError("Not a resource");
        const res = value.asResource();
        if(!res.isWritable())
            throw new InvalidResourceError("Not writable");
        const str = this.content.interpretExpression(resContext).toString();
        try {
            if(context == resContext) {
                res.writeLine(str);
            } else if(this.thenWith) {
                res.writeFully(str, text => this.thenWith!.interpret(context, new TextValue(text)));
            } else {
                res.writeFully(str);
            }
            return null;
        } finally {
            if(resContext!=context)
                res.close();
        }
    }

    declare(transpiler: Transpiler): void {
        if(!(transpiler.context instanceof ResourceContext))
            transpiler = transpiler.newResourceTranspiler();
        this.resource.declare(transpiler);
        this.content.declare(transpiler);
        if(this.thenWith)
            this.thenWith.declare(transpiler, TextType.instance);
    }

    transpile(transpiler: Transpiler): void {
        if (transpiler.context instanceof ResourceContext)
            this.transpileLine(transpiler);
        else
            this.transpileFully(transpiler);
    }

    transpileLine(transpiler: Transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".writeLine(");
        this.content.transpile(transpiler);
        transpiler.append(")");
    }

    transpileFully(transpiler: Transpiler) {
        transpiler = transpiler.newResourceTranspiler();
        transpiler.append("var $res = ");
        this.resource.transpile(transpiler);
        transpiler.append(";").newLine();
        transpiler.append("try {").indent();
        transpiler.append("$res.writeFully(");
        this.content.transpile(transpiler);
        if(this.thenWith) {
            transpiler.append(", ");
            this.thenWith.transpile(transpiler, TextType.instance);
        }
        transpiler.append(");");
        transpiler.dedent().append("} finally {").indent();
        transpiler.append("$res.close();").newLine();
        transpiler.dedent().append("}");
        transpiler.flush();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
        if(this.thenWith)
            this.thenWith.toDialect(writer, TextType.instance);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("write ");
        this.content.toDialect(writer);
        writer.append(" to ");
        this.resource.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("write (");
        this.content.toDialect(writer);
        writer.append(") to ");
        this.resource.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.toEDialect(writer);
    }
}

