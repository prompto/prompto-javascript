import ObjectList from '../utils/ObjectList'
import {Expression} from "./index";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";
import {Section} from "../parser";

export default class ExpressionList extends ObjectList<Expression> {

    constructor(items?: Expression[], item?: Expression) {
        super(items, item);
    }

    locateSectionAtLine(line: number): Section | null {
        for(let i = 0;i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line);
            if(section)
                return section;
        }
        return null;
    }

    toDialect(writer: CodeWriter): void {
        if (this.length > 0) {
            for (let i = 0; i < this.length; i++) {
                this[i].toDialect(writer);
                writer.append(", ");
            }
            writer.trimLast(2);
        }
    }

    declare(transpiler: Transpiler): void {
        this.forEach(item => {
            item.declare(transpiler);
        });
    }

    transpile(transpiler: Transpiler): void {
        if (this.length > 0) {
            for (let i = 0; i < this.length; i++) {
                this[i].transpile(transpiler);
                transpiler.append(", ");
            }
            transpiler.trimLast(2);
        }
    }
}
