var ThisExpression = require("./ThisExpression").ThisExpression;
var InstanceContext = require("../runtime/Context").InstanceContext;
var CategoryType = require("../type/CategoryType").CategoryType;

function SuperExpression() {
    ThisExpression.call(this);
    return this;
}

SuperExpression.prototype = Object.create(ThisExpression.prototype);
SuperExpression.prototype.constructor = SuperExpression;

SuperExpression.prototype.check = function(context) {
    return this.getSuperType(context);
};


SuperExpression.prototype.getSuperType = function(context) {
    if (context != null && !(context instanceof InstanceContext))
        context = context.getClosestInstanceContext ();
    if (context instanceof InstanceContext) {
        var type = context.instanceType;
        if(type instanceof CategoryType)
            return type.getSuperType(context, this);
        else
            return type;
    }
    else
        context.problemListener.reportNoSuperType(section, this);
};


SuperExpression.prototype.toDialect = function(writer) {
    writer.append("super");
};

SuperExpression.prototype.transpile = function(transpiler) {
    var type = this.getSuperType(transpiler.context);
    transpiler.append(type.name).append(".prototype");
};

exports.SuperExpression = SuperExpression;
