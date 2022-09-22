import Section from '../parser/Section.ts'
import { BooleanType, VoidType } from '../type'

export default class JsxProperty extends Section {

    constructor(id, value, suite) {
        super();
        this.id = id;
        this.value = value;
        this.suite = suite;
    }

    check(context: Context): Type {
        if(this.value!=null)
            return this.value.check(context);
        else
            return BooleanType.instance; // a value-less property is treated as a boolean flag
    }

    checkProto(context, proto) {
        if(this.value!=null)
            return this.value.checkProto(context, proto);
        else
            return VoidType.instance; // force failure
    }

    declareProto(transpiler, proto) {
        if(this.value!=null)
            this.value.declareProto(transpiler, proto);
    }

    transpileProto(transpiler, proto) {
        if(this.value!=null)
            this.value.transpileProto(transpiler, proto);
    }

    toDialect(writer: CodeWriter): void {
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

    declare(transpiler: Transpiler): void {
        if(this.value!=null)
            this.value.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        let name = this.id.name;
        if(name.indexOf('-')>=0)
            name = '"' + name + '"';
        transpiler.append(name);
        transpiler.append(": ");
        if(this.value!=null)
            this.value.transpile(transpiler);
        else
            transpiler.append("null");
    }
}

