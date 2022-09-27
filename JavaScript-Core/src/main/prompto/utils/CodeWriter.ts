import { Context } from '../runtime'
import {Dialect} from "../parser";
import IWritable from "../../../main/prompto/utils/IWritable";
import IType from "../type";

class Indenter {

    value: string;
    indents: string;
    isStartOfLine: boolean;

    constructor() {
        this.value = "";
        this.indents = "";
        this.isStartOfLine = true;
    }

    appendTabsIfRequired(s: string) {
        if(this.isStartOfLine) {
            this.value += this.indents;
        }
        this.isStartOfLine = s.charAt(s.length-1)=='\n';
    }

    append(s) {
        this.value += s;
    }

    trimLast(count: number) {
        this.value = this.value.substring(0, this.value.length - count);
    }

    indent() {
        this.indents += '\t';
    }

    dedent() {
        if(this.indents.length==0) {
            throw new Error("Illegal dedent!");
        }
        this.indents = this.indents.slice(1);
    }
}

export default class CodeWriter {

    dialect: Dialect;
    context: Context;
    indenter: Indenter;
    escapeMode = 0;

    constructor(dialect: Dialect, context: Context, indenter?: Indenter) {
        this.dialect = dialect;
        this.context = context || Context.newGlobalsContext();
        this.indenter = indenter || new Indenter();
    }

    isGlobalContext() {
        return this.context.isGlobalContext();
    }

    appendRaw(s: string) {
        this.indenter.append(s);
        return this;
    }

    append(s: string) {
        this.indenter.appendTabsIfRequired(s);
        this.indenter.append(s);
        return this;
    }

    trimLast(count: number) {
        this.indenter.trimLast(count);
        return this;
    }

    indent() {
        this.indenter.indent();
        return this;
    }

    dedent() {
        this.indenter.dedent();
        return this;
    }

    newLine() {
        this.append('\n');
        return this;
    }

    toString() {
        return this.indenter.value;
    }

    newLocalWriter() {
        return new CodeWriter(this.dialect, this.context.newLocalContext(), this.indenter);
    }

    newChildWriter(context?: Context) {
        context = context || this.context.newChildContext();
        return new CodeWriter(this.dialect, context, this.indenter);
    }

    newInstanceWriter(type: IType) {
        return new CodeWriter(this.dialect, this.context.newInstanceContext(null, type), this.indenter);
    }

    newDocumentWriter() {
        return new CodeWriter(this.dialect, this.context.newDocumentContext(null, false), this.indenter);
    }

    newMemberWriter() {
        return new CodeWriter (this.dialect, this.context.newChildContext(), this.indenter);
    }

    toDialect(writable: IWritable) {
        this.dialect.toDialect(this, writable);
    }
}
