var AbstractMethodDeclaration = require("./AbstractMethodDeclaration").AbstractMethodDeclaration;

function ArrowDeclaration(arrow) {
    AbstractMethodDeclaration.call(this, arrow.method.id, arrow.method.parameters, arrow.method.returnType);
    this.arrow = arrow;
    return this;
}

ArrowDeclaration.prototype = Object.create(AbstractMethodDeclaration.prototype);
ArrowDeclaration.prototype.constructor = ArrowDeclaration;

ArrowDeclaration.prototype.interpret = function(context) {
    return this.arrow.interpret(context);
};

exports.ArrowDeclaration = ArrowDeclaration;
