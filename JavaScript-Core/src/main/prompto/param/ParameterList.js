var ObjectList = require("../utils/ObjectList").ObjectList;
var CodeParameter = require("./CodeParameter").CodeParameter;

class ParameterList extends ObjectList {
    constructor() {
        super();
        for (var i=0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
        return this;
    }

    register(context) {
        this.forEach(function(arg) {
            arg.register(context);
        });
    }

    check(context) {
        this.forEach(function(arg) {
            arg.check(context);
        });
    }

    declare(transpiler) {
        this.forEach(function(arg) {
            arg.declare(transpiler);
        });
    }

    find(name) {
        return this.filter(function(param) {
            return name === param.name;
        })[0] || null;
    }

    toDialect(writer) {
        if(this.length==0)
            return;
        writer.toDialect(this);
    }

    toEDialect(writer) {
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
    }

    toODialect(writer) {
        if(this.length>0) {
            this.forEach(function(arg) {
                arg.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    transpile(transpiler) {
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
    }
}

exports.ParameterList = ParameterList;