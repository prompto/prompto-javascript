var Section = require("../parser/Section").Section;
var AnnotationProcessors = require("../processor/AnnotationProcessors").AnnotationProcessors;

class Annotation extends Section {
    constructor(id, entries) {
        super();
        this.id = id;
        this.entries = entries || null;
        return this;
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
        var entry = this.entries.items.filter(function(entry) {
            return name === entry.key && entry.key.toString();
        })[0];
        if(entry)
            return entry.value;
        else
            return null;
    }

    toDialect(writer) {
        writer.append(this.name);
        if(this.entries != null && this.entries.items.length > 0) {
            writer.append("(");
            this.entries.items.forEach(function(entry) {
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
        var processor = AnnotationProcessors.forId(this.id);
        if(processor) {
            processor.processCategory(this, context, declaration);
        } else {
            context.problemListener.reportUnknownAnnotation(this);
        }
    }
}

exports.Annotation = Annotation;
