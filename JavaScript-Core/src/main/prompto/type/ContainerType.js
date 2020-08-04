var IterableType = require("./IterableType").IterableType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var Variable = require("../runtime/Variable").Variable;

class ContainerType extends IterableType {
  
    constructor(id, itemType) {
        super(id);
        this.itemType = itemType;
    }

    checkContains(context, section, other) {
        if(other.isAssignableFrom(context, this.itemType)) {
            return BooleanType.instance;
        } else {
            return IterableType.prototype.checkContains.call(this, context, section, other);
        }
    }

    checkMember(context, section, name) {
        if ("count" == name) {
            var IntegerType = require("./IntegerType").IntegerType;
            return IntegerType.instance;
        } else {
            return IterableType.prototype.checkMember.call(this, context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if ("count" !== name) {
            return IterableType.prototype.declareMember.call(this, transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("count" == name) {
            transpiler.append("length");
        } else {
            return IterableType.prototype.transpileMember.call(this, transpiler, name);
        }
    }

    declareSorted(transpiler, key) {
        // nothing to do
    }

    declareIterator(transpiler, name, expression) {
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.declare(transpiler);
    }

    transpileIterator(transpiler, name, expression) {
        transpiler.append(".iterate(function(").append(name).append(") { return ");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.transpile(transpiler);
        transpiler.append("; }, this)");
        transpiler.flush();
    }
}

exports.ContainerType = ContainerType;
