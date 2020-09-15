import BaseStatement from './BaseStatement.js'
import { VoidType } from '../type/index.js'
import { Dialect } from '../parser/index.js'

export default class CommentStatement extends BaseStatement {

    constructor(text) {
        super();
        this.text = text;
    }

    check(context) {
        return VoidType.instance;
    }

    interpret(context) {
        return null;
    }

    declare(transpiler) {
    }

    transpile(transpiler) {
        return true; // skip
    }

    toDialect(writer) {
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
