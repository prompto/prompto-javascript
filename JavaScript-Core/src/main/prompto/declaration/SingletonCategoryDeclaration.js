var ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var CategoryType = require("../type/CategoryType").CategoryType;

class SingletonCategoryDeclaration extends ConcreteCategoryDeclaration {
    constructor(id, attributes, methods) {
        super(id, attributes, null, methods);
        return this;
    }

    categoryTypeToEDialect(writer) {
        writer.append("singleton");
    }

    categoryTypeToODialect(writer) {
        writer.append("singleton");
    }

    categoryTypeToMDialect(writer) {
        writer.append("singleton");
    }

    transpile(transpiler) {
        transpiler.append("function ").append(this.name).append("() {").indent();
        transpiler.append("$Root.call(this);").newLine();
        transpiler.append("this.$mutable = true;").newLine();
        transpiler.append("return this;").dedent();
        transpiler.append("};").newLine();
        transpiler.append(this.name).append(".prototype = Object.create($Root.prototype);").newLine();
        transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
        transpiler.append(this.name).append(".instance = new ").append(this.name).append("();").newLine();
        if(this.attributes) {
            this.attributes.forEach(function (attr) {
                transpiler.append(this.name).append(".instance.").append(attr.name).append(" = null;").newLine();
            }, this);
        }
        var type = new CategoryType(this.id);
        var instance = transpiler.newInstanceTranspiler(type);
        this.methods.forEach(method => {
            var m = instance.newChildTranspiler();
            method.transpile(m);
            m.flush();
        }, this);
        instance.flush();
        transpiler.flush();
    }
}

exports.SingletonCategoryDeclaration = SingletonCategoryDeclaration;