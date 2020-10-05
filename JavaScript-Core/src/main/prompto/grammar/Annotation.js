import Section from '../parser/Section.js'
import { AnnotationProcessors } from '../processor/index.js'

export default class Annotation extends Section {

    constructor(id, entries) {
        super();
        this.id = id;
        this.entries = entries || null;
    }

    get name() {
        return this.id.name;
    }

    getDefaultArgument() {
        if(this.entries && this.entries.items.length===1)
            return this.entries.items[0].value;
        else
            return null;
    }

    getArgument(name) {
        if(!this.entries || !this.entries.items)
            return null;
        const entry = this.entries.items.filter(entry => name === entry.key && entry.key.toString())[0];
        if(entry)
            return entry.value;
        else
            return null;
    }

    toDialect(writer) {
        writer.append(this.name);
        if(this.entries != null && this.entries.items.length > 0) {
            writer.append("(");
            this.entries.items.forEach(entry => {
                if(entry.key) {
                    writer.append(entry.key);
                    writer.append(" = ");
                }
                entry.value.toDialect(writer);
                writer.append(", ");
            }, this);
            writer.trimLast(", ".length);
            writer.append(")");
        }
        writer.newLine();
    }

    processCategory(context, declaration) {
        const processor = AnnotationProcessors.forId(this.id);
        if(processor) {
            processor.processCategory(this, context, declaration);
        } else {
            context.problemListener.reportUnknownAnnotation(this);
        }
    }
}
