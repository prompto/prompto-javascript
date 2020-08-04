var BaseStatement = require("./BaseStatement").BaseStatement;
var Variable = require("../runtime/Variable").Variable;
var IntegerType = require("../type/IntegerType").IntegerType;
var ListType = require("../type/ListType").ListType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var InternalError = require("../error/InternalError").InternalError;
var BreakResult = require("../runtime/BreakResult").BreakResult;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;

class ForEachStatement extends BaseStatement {
    constructor(v1, v2, source, statements) {
        super();
        this.v1 = v1 || null;
        this.v2 = v2 || null;
        this.source = source;
        this.statements = statements;
        return this;
    }

    check(context) {
        var srcType = this.source.check(context);
        var elemType = srcType.checkIterator(context, this.source);
        return this.checkItemIterator(elemType, context);
    }

    checkItemIterator(elemType, context) {
        var child = context.newChildContext();
        var itemName = this.v2 === null ? this.v1 : this.v2;
        child.registerValue(new Variable(itemName, elemType));
        if (this.v2 !== null) {
            child.registerValue(new Variable(this.v1, IntegerType.instance));
        }
        return this.statements.check(child, null);
    }

    interpret(context) {
        var srcType = this.source.check(context);
        var elemType = srcType.checkIterator(context, this.source);
        return this.interpretItemIterator(elemType, context);
    }

    interpretItemIterator(elemType, context) {
        if (this.v2 === null) {
            return this.interpretItemIteratorNoIndex(elemType, context);
        } else {
            return this.interpretItemIteratorWithIndex(elemType, context);
        }
    }

    interpretItemIteratorNoIndex(elemType, context) {
        var src = this.source.interpret(context);
        var iterator = this.getIterator(context, src);
        while (iterator.hasNext()) {
            var child = context.newChildContext();
            child.registerValue(new Variable(this.v1, elemType));
            var value = iterator.next();
            child.setValue(this.v1, value);
            value = this.statements.interpret(child);
            if(value==BreakResult.instance)
                break;
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    getIterator(context, src) {
        if(src.getIterator)
            return src.getIterator();
        else if(src.hasNext && src.next)
            return src;
        else
            throw new InternalError("Should never end up here!");
    }

    interpretItemIteratorWithIndex(elemType, context) {
        var src = this.source.interpret(context);
        var iterator = src.getIterator(context);
        var index = 0;
        while (iterator.hasNext()) {
            var child = context.newChildContext();
            child.registerValue(new Variable(this.v2, elemType));
            child.setValue(this.v2, iterator.next());
            child.registerValue(new Variable(this.v1, IntegerType.instance));
            child.setValue(this.v1, new IntegerValue(++index));
            var value = this.statements.interpret(child);
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    toDialect(writer) {
        writer = writer.newChildWriter();
        var srcType = this.source.check(writer.context);
        var elemType = srcType.checkIterator(writer.context, this.source);
        var itemName = this.v2 ? this.v2 : this.v1;
        writer.context.registerValue(new Variable(itemName, elemType))
        if(this.v2)
            writer.context.registerValue(new Variable(this.v1, IntegerType.instance))
        writer.toDialect(this);
    }

    toODialect(writer) {
        writer.append("for each (");
        writer.append(this.v1.name);
        if(this.v2 !== null) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(")");
        var oneLine = this.statements.length === 1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine) {
            writer.append("}");
            writer.newLine();
        }
    }

    toEDialect(writer) {
        writer.append("for each ");
        writer.append(this.v1.name);
        if(this.v2 !== null) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(":");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("for ");
        writer.append(this.v1.name);
        if(this.v2!=null) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(":");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    canReturn() {
        return true;
    }

    declare(transpiler) {
        var srcType = this.source.check(transpiler.context);
        if(srcType instanceof DictionaryType)
            transpiler.require(StrictSet);
        var elemType = srcType.checkIterator(transpiler.context, this.source);
        this.source.declare(transpiler);
        transpiler = transpiler.newChildTranspiler();
        if(this.v2) {
            transpiler.context.registerValue(new Variable(this.v1, IntegerType.instance));
            transpiler.context.registerValue(new Variable(this.v2, elemType));
        } else
            transpiler.context.registerValue(new Variable(this.v1, elemType));
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        if(this.v2)
            this.transpileWithIndex(transpiler);
        else
            this.transpileNoIndex(transpiler);
        return true;
    }

    transpileNoIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        if(srcType instanceof ListType)
            this.transpileArrayNoIndex(transpiler);
        else
            this.transpileIteratorNoIndex(transpiler);
    }

    transpileArrayNoIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        var elemType = srcType.checkIterator(transpiler.context, this.source);
        var itemsName = "$" + this.v1.name + "_items";
        transpiler.append("var ").append(itemsName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(";").newLine();
        var idxName = "$" + this.v1.name + "_idx";
        transpiler.append("for(var ").append(idxName).append(" = 0; ").append(idxName).append(" < ").append(itemsName).append(".length; ").append(idxName).append("++) {");
        var child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerValue(new Variable(this.v1, elemType));
        child.append("var ").append(this.v1.name).append(" = ").append(itemsName).append("[").append(idxName).append("];");
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
     }

    transpileIteratorNoIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        var elemType = srcType.checkIterator(transpiler.context, this.source);
        var iterName = "$" + this.v1.name + "_iterator";
        transpiler.append("var ").append(iterName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(".iterator();");
        transpiler.newLine();
        transpiler.append("while(").append(iterName).append(".hasNext()) {");
        var child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerValue(new Variable(this.v1, elemType));
        child.append("var ").append(this.v1.name).append(" = ").append(iterName).append(".next();");
        child.newLine();
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

    transpileWithIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        if(srcType instanceof ListType)
            this.transpileArrayWithIndex(transpiler);
        else
            this.transpileIteratorWithIndex(transpiler);
    }

    transpileArrayWithIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        var elemType = srcType.checkIterator(transpiler.context, this.source);
        var itemsName = "$" + this.v2.name + "_items";
        transpiler.append("var ").append(itemsName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(";").newLine();
        transpiler.append("for(var ").append(this.v1.name).append(" = 1; ").append(this.v1.name).append(" <= ").append(itemsName).append(".length; ").append(this.v1.name).append("++) {");
        var child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerValue(new Variable(this.v1, IntegerType.instance));
        child.context.registerValue(new Variable(this.v2, elemType));
        child.append("var ").append(this.v2.name).append(" = ").append(itemsName).append("[").append(this.v1.name).append("-1];").newLine();
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

    transpileIteratorWithIndex(transpiler) {
        var srcType = this.source.check(transpiler.context);
        var elemType = srcType.checkIterator(transpiler.context, this.source);
        transpiler.append("var ").append(this.v1.name).append(" = 1;").newLine();
        var iterName = "$" + this.v2.name + "_iterator";
        transpiler.append("var ").append(iterName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(".iterator();");
        transpiler.newLine();
        transpiler.append("while(").append(iterName).append(".hasNext()) {");
        var child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerValue(new Variable(this.v1, IntegerType.instance));
        child.context.registerValue(new Variable(this.v2, elemType));
        child.append("var ").append(this.v2.name).append(" = ").append(iterName).append(".next();").newLine();
        this.statements.transpile(child);
        child.append(this.v1.name).append("++;").newLine();
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

    locateSectionAtLine(line) {
        return this.statements.locateSectionAtLine(line) || this;
    }
}


exports.ForEachStatement = ForEachStatement;