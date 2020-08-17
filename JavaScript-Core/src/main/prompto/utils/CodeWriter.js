import { Context } from "../runtime/index"

class Indenter {

    constructor() {
        this.value = "";
        this.indents = "";
        this.isStartOfLine = true;
    }

    appendTabsIfRequired(s) {
        if(this.isStartOfLine) {
            this.value += this.indents;
        }
        this.isStartOfLine = s.charAt(s.length-1)=='\n';
    }

    append(s) {
        this.value += s;
    }

    trimLast(count) {
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

    constructor(dialect, context, indenter) {
        this.dialect = dialect;
        this.context = context || Context.newGlobalsContext();
        this.indenter = indenter || new Indenter();
    }

    isGlobalContext() {
        return this.context.isGlobalContext();
    }

    appendRaw(s) {
        this.indenter.append(s);
        return this;
    }

    append(s) {
        if(typeof(s)!==typeof(""))
            console.error(s);
        this.indenter.appendTabsIfRequired(s);
        this.indenter.append(s);
        return this;
    }

    trimLast(count) {
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

    newChildWriter(context) {
        context = context || this.context.newChildContext();
        return new CodeWriter(this.dialect, context, this.indenter);
    }

    newInstanceWriter(type) {
        return new CodeWriter(this.dialect, this.context.newInstanceContext(null, type), this.indenter);
    }

    newDocumentWriter() {
        return new CodeWriter(this.dialect, this.context.newDocumentContext(null, false), this.indenter);
    }

    newMemberWriter() {
        return new CodeWriter (this.dialect, this.context.newChildContext(), this.indenter);
    }

    toDialect(o) {
        this.dialect.toDialect(this, o);
    }
}
