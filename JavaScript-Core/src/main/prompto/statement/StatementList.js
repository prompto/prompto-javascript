var ObjectList = require("../utils/ObjectList").ObjectList;
var TypeMap = require("../type/TypeMap").TypeMap;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;
var PromptoError = require("../error/PromptoError").PromptoError;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var NativeCall = require("./NativeCall").NativeCall;
var JavaScriptNativeCall = require("../javascript/JavaScriptNativeCall").JavaScriptNativeCall;

function StatementList(statement) {
    ObjectList.call(this);
    this.add(statement);
    return this;
}

StatementList.prototype = Object.create(ObjectList.prototype);
StatementList.prototype.constructor = StatementList;

StatementList.prototype.check = function(context, returnType) {
    return this.checkStatements(context, returnType, false);
};


StatementList.prototype.checkNative = function(context, returnType) {
    return this.checkStatements(context, returnType, true);
};

StatementList.prototype.checkStatement = function(context, statement) {
    try {
        return statement.check(context);
    } catch(e) {
        if(e instanceof PromptoError)
            context.problemListener.reportError(statement, e.message);
        else {
            context.problemListener.reportError(statement, "Internal error, check your syntax!");
            console.error(e.stack);
        }
        return VoidType.instance;
    }
};

StatementList.prototype.checkStatements = function(context, returnType, nativeOnly) {
    if(returnType==VoidType.instance) {
        if(nativeOnly) {
            this.filter(function (stmt) { return stmt instanceof JavaScriptNativeCall; }, this)
                .forEach(function (stmt) { this.checkStatement(context, stmt); }, this);
        } else {
            this.forEach(function (stmt) { this.checkStatement(context, stmt); }, this);
        }
        return VoidType.instance;
    } else {
        var section = null;
        var stmts = nativeOnly ? this.filter(function (stmt) { return stmt instanceof JavaScriptNativeCall; }, this) : this;
        var types = new TypeMap();
        stmts.forEach(function (stmt) {
            var type = this.checkStatement(context, stmt);
            if(!stmt.canReturn())
                type = VoidType.instance;
            if(type!==VoidType.instance) {
                section = stmt;
                types[type.name] = type;
            }
        }, this);
        return types.inferType(context, section);
    }
};

StatementList.prototype.interpret = function(context) {
    try {
        return this.doInterpret(context);
    } catch(e) {
        if(e instanceof ReferenceError) {
            throw new NullReferenceError();
        } else {
            if(!(e instanceof PromptoError))
                console.trace();
            throw e;
        }
    }
};

StatementList.prototype.interpretNative = function(context, returnType) {
    try {
        return this.doInterpretNative(context, returnType);
    } catch(e) {
        if(e instanceof ReferenceError) {
            throw new NullReferenceError();
        } else {
            if(!(e instanceof PromptoError))
                console.trace();
            throw e;
        }
    }
};

StatementList.prototype.doInterpret = function(context) {
    for(var i=0;i<this.length;i++) {
        var stmt = this[i];
        context.enterStatement(stmt);
        try {
            var result = stmt.interpret(context);
            if(!stmt.canReturn())
                result = null;
            if(result!=null)
                return result;
        } finally {
            context.leaveStatement(stmt);
        }
    }
    return null;
};

StatementList.prototype.doInterpretNative = function(context, returnType) {
    for(var i=0;i<this.length;i++) {
        var stmt = this[i];
        if(!(stmt instanceof JavaScriptNativeCall))
            continue;
        context.enterStatement(stmt);
        try {
            var result = stmt.interpret(context, returnType);
            if(result!=null)
                return result;
        } finally {
            context.leaveStatement(stmt);
        }
    }
    return null;
};

StatementList.prototype.toDialect = function(writer) {
    if(this.length==0) {
        switch(writer.dialect) {
            case Dialect.E:
            case Dialect.M:
                writer.append("pass").newLine();
                break;
        }

    } else {
        this.forEach(function (stmt) {
            stmt.toDialect(writer);
            if (stmt.isSimple()) {
                if (writer.dialect == Dialect.O && !(stmt instanceof NativeCall))
                    writer.append(';');
                writer.newLine();
            }
        });
    }
};

StatementList.prototype.declare = function(transpiler) {
    this.forEach(function(stmt) {
        stmt.declare(transpiler);
    });
};

StatementList.prototype.transpile = function(transpiler) {
    this.forEach(function(stmt) {
        var skip = stmt.transpile(transpiler);
        if(!skip)
            transpiler.append(";").newLine();
    });
};


StatementList.prototype.locateSectionAtLine = function(line) {
    const statement = this.find( function(s) { return s.containsLine(line); });
    return statement ? statement.locateSectionAtLine(line) : null;
};

exports.StatementList = StatementList;
