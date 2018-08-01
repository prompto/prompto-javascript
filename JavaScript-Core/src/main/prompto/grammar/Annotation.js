function Annotation(id, expression) {
    this.id = id;
    this.expression = expression;
    return this;
}

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
