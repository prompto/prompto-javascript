import ObjectList from '../utils/ObjectList'
import { Dialect } from '../parser'
import {Identifier} from "./index";
import {CodeWriter} from "../utils";

export default class IdentifierList extends ObjectList<Identifier> {

    constructor(items?: Identifier[] | null, item?: Identifier | null) {
        super(items, item);
    }

    names(): string[] {
        return this.map(id => id.name );
    }

    hasAttribute(name: string): boolean {
        for(let i = 0; i < this.length; i++) {
            if(this[i].name==name)
                return true;
        }
        return false;
    }

    toDialect(writer: CodeWriter, finalAnd?: boolean): void {
        finalAnd = finalAnd || false;
        switch(writer.dialect) {
            case Dialect.E:
                this.toEDialect(writer, finalAnd);
                break;
            case Dialect.O:
                this.toODialect(writer);
                break;
            case Dialect.M:
                this.toMDialect(writer);
                break;
        }
    }

    toEDialect(writer: CodeWriter, finalAnd: boolean): void {
        switch(this.length) {
            case 0:
                return;
            case 1:
                writer.append(this[0].name);
                break;
            default:
                for(let i=0;i<this.length;i++) {
                    if(finalAnd && i == this.length-1)
                        break;
                    writer.append(this[i].name);
                    writer.append(", ");
                }
                writer.trimLast(2);
                if(finalAnd) {
                    writer.append(" and ");
                    writer.append(this[this.length-1].name);
                }
        }
    }

    toODialect(writer: CodeWriter): void {
        if(this.length>0) {
            this.forEach(id => {
                writer.append(id.name);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }
}
