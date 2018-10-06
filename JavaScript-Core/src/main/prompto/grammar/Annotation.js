var Section = require("../parser/Section").Section;

function Annotation(id, expression) {
    Section.call(this);
    this.id = id;
    this.expression = expression;
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
    if(this.expression!=null) {
        writer.append("(");
        this.expression.toDialect(writer);
        writer.append(")");
    }
    writer.newLine();
};

exports.Annotation = Annotation;
