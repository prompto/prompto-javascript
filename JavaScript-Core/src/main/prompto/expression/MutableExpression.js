var Section = require("../parser/Section").Section;
var CategoryType = require("../type/CategoryType").CategoryType;
var ConstructorExpression = require("./ConstructorExpression").ConstructorExpression;

function MutableExpression(source) {
    Section.call(this);
    this.source = source;
    return this;
}

MutableExpression.prototype  = Object.create(Section.prototype);
MutableExpression.prototype.constructor = MutableExpression;

MutableExpression.prototype.check = function(context) {
    var sourceType = this.source.check(context);
    if(!(sourceType instanceof CategoryType))
        context.problemListener.reportInvalidCopySource(this);
    return new CategoryType(sourceType, true);

};


MutableExpression.prototype.interpret = function(context) {
    var sourceType = this.check(context);
    var ctor = new ConstructorExpression(sourceType, this.source, null, true);
    return ctor.interpret(context);
};


MutableExpression.prototype.declare = function(transpiler) {
    var sourceType = this.check(transpiler.context);
    var ctor = new ConstructorExpression(sourceType, this.source, null, true);
    ctor.declare(transpiler);
};


MutableExpression.prototype.transpile = function(transpiler) {
    var sourceType = this.check(transpiler.context);
    var ctor = new ConstructorExpression(sourceType, this.source, null, true);
    ctor.transpile(transpiler);
};


MutableExpression.prototype.toDialect = function(writer) {
    writer.append("mutable ");
    this.source.toDialect(writer);
};

exports.MutableExpression = MutableExpression;
