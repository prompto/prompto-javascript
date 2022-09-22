import BaseStatement from './BaseStatement'
import { VoidType } from '../type'
import { Dialect } from '../parser'
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class CommentStatement extends BaseStatement {

    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    locateSectionAtLine(line) {
        return null;
    }

    check(context: Context): Type {
        return VoidType.instance;
    }

    interpret(context: Context): Value {
        return null;
    }

    declare(transpiler: Transpiler): void {
    }

    transpile(transpiler: Transpiler): void {
        return true; // skip
    }

    toDialect(writer: CodeWriter): void {
        let lines = this.text.split("\n");
        lines = lines.map(line => uncomment(line));
        switch (writer.dialect) {
            case Dialect.E:
            case Dialect.O:
                if (lines.length > 1) {
                    writer.append("/*");
                    lines.forEach(line => {
                        writer.append(line)
                        writer.newLine();
                    });
                    writer.trimLast(1);
                    writer.append("*/");
                    writer.newLine();
                } else {
                    writer.append("//");
                    writer.append(lines[0]);
                    writer.newLine();
                }
                break;
            case Dialect.M:
                lines.forEach(line => {
                    writer.append("#")
                    writer.append(line)
                    writer.newLine()
                });
                break;
        }
    }
}


function uncomment(line) {
    if (line.indexOf("#")===0)
        return line.substring(1);
    else if(line.indexOf("//")===0)
        return line.substring(2);
    else
        return line;
}
