import BaseStatement from './BaseStatement.js'
import { ResourceContext } from '../runtime/index.js'
import { VoidType, ResourceType, TextType } from '../type/index.js'
import { TextValue } from '../value/index.js'
import { NullReferenceError, InvalidResourceError } from '../error/index.js'
import {StatementList} from "./index.js";

export default class WriteStatement extends BaseStatement {

    constructor(content, resource, thenWith) {
        super();
        this.content = content;
        this.resource = resource;
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

    isSimple() {
        return this.thenWith === null;
    }

    toString() {
        return "write " + this.content.toString() + " to " + this.resource.toString();
    }

    check(context) {
        context = context instanceof ResourceContext ? context : context.newResourceContext();
        const resourceType = this.resource.check(context);
        if(!(resourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        if(this.thenWith)
            return this.thenWith.check(context, TextType.instance);
        else
            return VoidType.instance;
    }

    interpret(context) {
        const resContext = context instanceof ResourceContext ? context : context.newResourceContext();
        const res = this.resource.interpret(resContext);
        if(res==null) {
            throw new NullReferenceError();
        }
        if(!res.isWritable || !res.isWritable()) {
            throw new InvalidResourceError("Not writable");
        }
        const str = this.content.interpret(resContext).toString();
        try {
            if(context===resContext) {
                res.writeLine(str);
            } else if(this.thenWith) {
                res.writeFully(str, text => this.thenWith.interpret(context, new TextValue(text)));
            } else {
                res.writeFully(str);
            }
            return null;
        } finally {
            if(resContext!==context)
                res.close();
        }
    }

    declare(transpiler) {
        if(!(transpiler.context instanceof ResourceContext))
            transpiler = transpiler.newResourceTranspiler();
        this.resource.declare(transpiler);
        this.content.declare(transpiler);
        if(this.thenWith)
            this.thenWith.declare(transpiler, TextType.instance);
    }

    transpile(transpiler) {
        if (transpiler.context instanceof ResourceContext)
            this.transpileLine(transpiler);
        else
            this.transpileFully(transpiler);
    }

    transpileLine(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".writeLine(");
        this.content.transpile(transpiler);
        transpiler.append(")");
    }

    transpileFully(transpiler) {
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

    toDialect(writer) {
        writer.toDialect(this);
        if(this.thenWith)
            this.thenWith.toDialect(writer, TextType.instance);
    }

    toEDialect(writer) {
        writer.append("write ");
        this.content.toDialect(writer);
        writer.append(" to ");
        this.resource.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("write (");
        this.content.toDialect(writer);
        writer.append(") to ");
        this.resource.toDialect(writer);
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }
}

