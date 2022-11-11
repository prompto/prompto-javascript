import BaseStatement from './BaseStatement'
import {IType, VoidType} from '../type'
import {Dialect, Section} from '../parser'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";


function uncomment(line: string) {
    if (line.indexOf("#")==0)
        return line.substring(1);
    else if(line.indexOf("//")==0)
        return line.substring(2);
    else
        return line;
}

export default class CommentStatement extends BaseStatement {

    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    locateSectionAtLine(line: number): Section | null {
        return null;
    }

    check(context: Context): IType {
        return VoidType.instance;
    }

    interpretStatement(context: Context): IValue | null {
        return null;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
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


