var Section = require("../parser/Section").Section;

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

exports.Annotation = Annotation;
