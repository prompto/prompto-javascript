
export default class SingletonCategoryDeclaration extends ConcreteCategoryDeclaration {

    constructor(id, attributes, methods) {
        super(id, attributes, null, methods);
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
        const type = new CategoryType(this.id);
        const instance = transpiler.newInstanceTranspiler(type);
        this.methods.forEach(method => {
            const m = instance.newChildTranspiler();
            method.transpile(m);
            m.flush();
        }, this);
        instance.flush();
        transpiler.flush();
    }
}
