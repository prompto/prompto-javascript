var ObjectList = require("../utils/ObjectList").ObjectList;
var CodeParameter = require("./CodeParameter").CodeParameter;

function ParameterList() {
	ObjectList.call(this);
    for (var i=0; i < arguments.length; i++) {
		this.add(arguments[i]);
	}
	return this;
}

ParameterList.prototype = Object.create(ObjectList.prototype);
ParameterList.prototype.constructor = ParameterList;

ParameterList.prototype.register = function(context) {
    this.forEach(function(arg) {
        arg.register(context);
    });
};

ParameterList.prototype.check = function(context) {
    this.forEach(function(arg) {
        arg.check(context);
    });
};

ParameterList.prototype.declare = function(transpiler) {
    this.forEach(function(arg) {
        arg.declare(transpiler);
    });
};

ParameterList.prototype.find = function(name) {
    return this.filter(function(param) {
        return name === param.name;
    })[0] || null;
};

ParameterList.prototype.toDialect = function(writer) {
    if(this.length==0)
        return;
    writer.toDialect(this);
};

ParameterList.prototype.toEDialect = function(writer) {
    writer.append("receiving ");
    for(var i=0;i<this.length-1;i++) {
        this[i].toDialect(writer);
        writer.append(", ");
    }
    if(this.length>1) {
        writer.trimLast(2);
        writer.append(" and ");
    }
    this[this.length-1].toDialect(writer);
    writer.append(" ");
};

ParameterList.prototype.toODialect = function(writer) {
    if(this.length>0) {
        this.forEach(function(arg) {
            arg.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};

ParameterList.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};

ParameterList.prototype.transpile = function(transpiler) {
    var args = this.filter(function(arg) {
        return !(arg instanceof CodeParameter);
    })
    if(args.length>0) {
        args.forEach(function (arg) {
            arg.transpile(transpiler);
            transpiler.append(", ");
        });
        transpiler.trimLast(2);
    }
};

exports.ParameterList = ParameterList;