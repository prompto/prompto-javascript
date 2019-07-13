var Section = require("../parser/Section").Section;
var AnnotationProcessors = require("../processor/AnnotationProcessors").AnnotationProcessors;

function Annotation(id, entries) {
    Section.call(this);
    this.id = id;
    this.entries = entries || null;
    return this;
}

Annotation.prototype = Object.create(Section.prototype);
Annotation.prototype.constructor = Annotation;


Object.defineProperty(Annotation.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


Annotation.prototype.getArgument = function(name) {
    if(!this.entries || !this.entries.items)
        return null;
    var entry = this.entries.items.filter(function(entry) {
        return name === entry.key && entry.key.toString();
    })[0];
    if(entry)
        return entry.value;
    else
        return null;
};


Annotation.prototype.toDialect = function(writer) {
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
};


Annotation.prototype.processCategory = function(context, declaration) {
    var processor = AnnotationProcessors.forId(this.id);
    if(processor) {
        processor.processCategory(this, context, declaration);
    }
};

exports.Annotation = Annotation;
