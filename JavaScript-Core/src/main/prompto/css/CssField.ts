import ICssValue from "./ICssValue";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class CssField {

    name: string;
    values: ICssValue[];

    constructor(name: string, values: ICssValue[]) {
        this.name = name;
        this.values = values;
    }

    toString(): string {
        return this.name + ": " + this.valuesToString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name).append(":");
        this.values.forEach(v => v.toDialect(writer));
        writer.append(";");
    }

    declare(transpiler: Transpiler): void {
        this.values.forEach(v => v.declare(transpiler));
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("'").append(this.name).append("':");
        if(this.values.length == 1)
            this.values[0].transpile(transpiler);
        else {
            transpiler.append('"" + ');
            this.values.forEach(v => {
                v.transpile(transpiler);
                transpiler.append(" + ");
            });
            transpiler.trimLast(" + ".length);
        }
    }

    valuesToString() {
        return this.values.map(v => v.toString()).join("");
    }
}
