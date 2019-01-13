var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var VoidType = require("../type/VoidType").VoidType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var NullValue = require("../value/NullValue").NullValue;

function NativeMethodDeclaration(id, args, returnType, statements) {
	ConcreteMethodDeclaration.call(this, id, args, returnType, statements);
	return this;
}

NativeMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
NativeMethodDeclaration.prototype.constructor = NativeMethodDeclaration;

NativeMethodDeclaration.prototype.check = function(context, isStart) {
    intrinsic = require("../intrinsic");
    if(isStart) {
        context = context.newLocalContext();
        this.registerArguments(context);
    }
    if(this.args!==null)
        this.args.check(context);
    var checked = this.statements.checkNative(context, this.returnType);
    return this.returnType==null ? checked : this.returnType;
};


NativeMethodDeclaration.prototype.checkMember = function(category, context) {
    context = context.newInstanceContext(null, category.getType(context), false);
    if (this.args !== null)
        this.args.check(context);
    var child = context.newChildContext();
    this.registerArguments(child);
    var checked = this.statements.checkNative(context, this.returnType);
    return this.returnType == null ? checked : this.returnType;
};


NativeMethodDeclaration.prototype.interpret = function(context) {
    intrinsic = require("../intrinsic");
    context.enterMethod(this);
	try {
		var result = this.statements.interpretNative(context, this.returnType);
        return this.castToReturnType(context, result);
	} finally {
		context.leaveMethod(this);
	}
};


NativeMethodDeclaration.prototype.castToReturnType = function(context, value) {
    // can only cast to specified type, and if required
    if(value==null)
        value = NullValue.instance;
    else if(this.returnType==IntegerType.instance && value instanceof DecimalValue)
        value = new IntegerValue(value.IntegerValue());
    else if(this.returnType==DecimalType.instance && value instanceof IntegerValue)
        value = new DecimalValue(value.DecimalValue());
    else if(this.returnType!=null && !(this.returnType.isAssignableFrom(context, value.type))) {
        // only cast if implemented, on a per type basis
        if(this.returnType.nativeCast)
            value = this.returnType.nativeCast(context, value);
    }
    return value;
};

NativeMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ");
    if(this.memberOf==null)
        writer.append("native ");
    writer.append(this.name).append(" (");
    this.args.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
    writer.append(":").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

NativeMethodDeclaration.prototype.toODialect = function(writer) {
    if(this.returnType!=null  && this.returnType!=VoidType.instance) {
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    if(this.memberOf==null)
        writer.append("native ");
    writer.append("method ").append(this.name).append(" (");
    this.args.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements.forEach(function(stmt) {
        stmt.toDialect(writer);
        writer.newLine();
    });
    writer.dedent().append("}").newLine();
};

NativeMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as ");
    if(this.memberOf==null)
        writer.append("native ");
    writer.append("method ");
    this.args.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("doing:").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().newLine();
};

exports.NativeMethodDeclaration = NativeMethodDeclaration;
