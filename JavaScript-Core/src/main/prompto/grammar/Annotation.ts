import Section from '../parser/Section'
import { AnnotationProcessors } from '../processor'
import Identifier from "./Identifier";
import { DocEntryList } from "../literal";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Context} from "../runtime";
import {CategoryDeclaration} from "../declaration";

export default class Annotation extends Section {

    id: Identifier;
    entries: DocEntryList;

    constructor(id: Identifier, entries: DocEntryList) {
        super();
        this.id = id;
        this.entries = entries || null;
    }

    get name() {
        return this.id.name;
    }

    getDefaultArgument(): IExpression | null {
        if(this.entries && this.entries.length==1)
            return this.entries[0].value;
        else
            return null;
    }

    getArgument(name: string): IExpression | null {
        if(!this.entries)
            return null;
        const entry = this.entries.filter(entry => name == entry.key!.toString() )[0];
        if(entry)
            return entry.value;
        else
            return null;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        if(this.entries != null && this.entries.length > 0) {
            writer.append("(");
            this.entries.forEach(entry => {
                writer.append(entry.key!.toString());
                writer.append(" = ");
                entry.value.toDialect(writer);
                writer.append(", ");
            }, this);
            writer.trimLast(", ".length);
            writer.append(")");
        }
        writer.newLine();
    }

    processCategory(context: Context, declaration: CategoryDeclaration<any>) {
        const processor = AnnotationProcessors.forId(this.id);
        if(processor) {
            processor.processCategory(context, this, declaration);
        } else {
            context.problemListener.reportUnknownAnnotation(this, this.name);
        }
    }
}
