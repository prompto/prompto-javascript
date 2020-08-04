var BaseSwitchStatement = require("./BaseSwitchStatement").BaseSwitchStatement;
var ErrorVariable = require("../runtime/ErrorVariable").ErrorVariable;
var Identifier = require("../grammar/Identifier").Identifier;
var EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
var VoidType = require("../type/VoidType").VoidType;
var ExecutionError = require("../error/ExecutionError").ExecutionError;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var Argument = require("../grammar/Argument").Argument;
var UnresolvedParameter = require("../param/UnresolvedParameter").UnresolvedParameter;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
var CategoryType = require("../type/CategoryType").CategoryType;


class SwitchErrorStatement extends BaseSwitchStatement {

    constructor(errorId, statements, handlers, anyStmts, alwaysStmts) {
        super(handlers, anyStmts);
        this.errorId = errorId;
        this.statements = statements || null;
        this.alwaysInstructions = alwaysStmts || null;
    }

    checkSwitchCasesType(context) {
        var local = context.newLocalContext();
        local.registerValue(new ErrorVariable(this.errorId));
        super.checkSwitchCasesType(local);
    }

    checkSwitchType(context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }

    collectReturnTypes(context, types) {
        var type = this.statements.check(context, null);
        if(type!=VoidType.instance) {
            types[type.name] = type;
        }
        var local = context.newLocalContext();
        local.registerValue(new ErrorVariable(this.errorId));
        var section = BaseSwitchStatement.prototype.collectReturnTypes.call(this, local, types);
        if(this.alwaysInstructions!=null) {
            type = this.alwaysInstructions.check(context, null);
            if(type!=VoidType.instance) {
                types[type.name] = type;
            }
        }
        return section;
    }

    interpret(context) {
        var result = null;
        try {
            result = this.statements.interpret(context);
        } catch ( e) {
            if(e instanceof ExecutionError) {
                var switchValue = this.populateError(e, context);
                result = this.interpretSwitch(context, switchValue, e);
            } else {
                throw e;
            }
        } finally {
            if(this.alwaysInstructions!=null) {
                this.alwaysInstructions.interpret(context);
            }
        }
        return result;
    }

    populateError(e, context) {
        var error = e.getExpression(context);
        if(error==null) {
            var args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter("name"), new TextLiteral(typeof(e))));
            args.add(new Argument(new UnresolvedParameter("text"), new TextLiteral(e.message)));
            error = new ConstructorExpression(new CategoryType("Error"), args);
        }
        if(context.getRegisteredValue(this.errorId)==null) {
            context.registerValue(new ErrorVariable(this.errorId));
        }
        if(error.interpret) {
            error = error.interpret(context);
        }
        context.setValue(this.errorId, error);
        return error;
    }

    toDialect(writer) {
        writer = writer.newLocalWriter();
        writer.context.registerValue(new ErrorVariable(this.errorId));
        super.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("try (").append(this.errorId.name).append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("} ");
        this.switchCases.forEach(function(switchCase) {
            switchCase.catchToODialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("catch(any) {").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent().append("}");
        }
        if(this.alwaysInstructions!=null) {
            writer.append("finally {").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent().append("}");
        }
        writer.newLine();
    }

    toMDialect(writer) {
        writer.append("try ").append(this.errorId.name).append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        this.switchCases.forEach(function(switchCase) {
            switchCase.catchToPDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("except:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        if(this.alwaysInstructions!=null) {
            writer.append("finally:").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent();
        }
        writer.newLine();
    }

    toEDialect(writer) {
        writer.append("switch on ").append(this.errorId.name).append(" doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        this.switchCases.forEach(function(switchCase) {
            switchCase.catchToEDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("when any:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        if(this.alwaysInstructions!=null) {
            writer.append("always:").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent();
        }
    }

    declare(transpiler) {
        this.statements.declare(transpiler);
        transpiler = transpiler.newLocalTranspiler();
        transpiler.context.registerValue(new ErrorVariable(this.errorId));
        this.declareSwitch(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("try {").indent();
        this.statements.transpile(transpiler);
        transpiler.dedent().append("} catch(").append(this.errorId.name).append(") {").indent();
        transpiler = transpiler.newLocalTranspiler();
        transpiler.context.registerValue(new ErrorVariable(this.errorId));
        transpiler.append("switch(translateError(").append(this.errorId.name).append(")) {").indent();
        this.switchCases.forEach(function(switchCase) {
            switchCase.transpileError(transpiler);
        }, this);
        if(this.defaultCase!=null) {
            transpiler.append("default:").indent();
            this.defaultCase.transpile(transpiler);
            transpiler.dedent();
        }
        transpiler.dedent().append("}");
        if(this.alwaysInstructions) {
            transpiler.append(" finally {").indent();
            this.alwaysInstructions.transpile(transpiler);
            transpiler.dedent().append("}");
        }
        transpiler.dedent().append("}");
        transpiler.flush();
        return true;
    }
}


exports.SwitchErrorStatement = SwitchErrorStatement;
