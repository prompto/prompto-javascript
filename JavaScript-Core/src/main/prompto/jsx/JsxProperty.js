import Section from '../parser/Section.js'
import { BooleanType, VoidType } from '../type/index.js'

export default class JsxProperty extends Section {

    constructor(id, value, suite) {
        super();
        this.id = id;
        this.value = value;
        this.suite = suite;
    }

    check(context) {
        if(this.value!=null)
            return this.value.check(context);
        else
            return BooleanType.instance; // a value-less property is treated as a boolean flag
    }

    checkMethodReference(context, method) {
        if(this.value!=null)
            return this.value.checkMethodReference(context, method);
        else
            return VoidType.instance; // force failure
    }

    toDialect(writer) {
        writer.append(this.id.name);
        if(this.value!=null) {
            writer.append("=");
            this.value.toDialect(writer);
        }
        if(this.suite)
            writer.appendRaw(this.suite);
        else
            writer.append(" ");
    }

    declare(transpiler) {
        if(this.value!=null)
            this.value.declare(transpiler);
    }

    declareMethodReference(transpiler, method) {
        if(this.value!=null)
            this.value.declareMethodReference(transpiler, method);
    }

    transpile(transpiler) {
        this.transpileName(transpiler);
        if(this.value!=null)
            this.value.transpile(transpiler);
        else
            transpiler.append("null");
    }

    transpileName(transpiler) {
        let name = this.id.name;
        if(name.indexOf('-')>=0)
            name = '"' + name + '"';
        transpiler.append(name);
        transpiler.append(": ");
    }

    transpileMethodReference(transpiler, method) {
        this.transpileName(transpiler);
        if(this.value!=null)
            this.value.transpileMethodReference(transpiler, method);
        else
            transpiler.append("null");
    }


}

