var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var VoidType = require("../type/VoidType").VoidType;
var Decimal = require("../value/Decimal").Decimal;
var Integer = require("../value/Integer").Integer;

function NativeMethodDeclaration(id, args, returnType, statements) {
	ConcreteMethodDeclaration.call(this, id, args,returnType, statements);
	return this;
}

NativeMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
NativeMethodDeclaration.prototype.constructor = NativeMethodDeclaration;

NativeMethodDeclaration.prototype.check = function(context) {
	var checked = this.fullCheck(context, true);
	return this.returnType != null ? this.returnType : checked;
};

NativeMethodDeclaration.prototype.interpret = function(context) {
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
    if(this.returnType==IntegerType.instance && value instanceof Decimal)
        value = new Integer(value.IntegerValue());
    else if(this.returnType==DecimalType.instance && value instanceof Integer)
        value = new Decimal(value.DecimalValue());
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
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
    writer.append(":\n");
    writer.indent();
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
    writer.append("method ");
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.statements.forEach(function(stmt) {
        stmt.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
    writer.append("}\n");
};

NativeMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as ");
    if(this.memberOf==null)
        writer.append("native ");
    writer.append("method ");
    this.args.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("doing:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("\n");
};

exports.NativeMethodDeclaration = NativeMethodDeclaration;
