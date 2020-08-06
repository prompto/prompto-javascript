const ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
const CategoryType = require("../type/CategoryType").CategoryType;
const IdentifierList = require("../grammar/IdentifierList").IdentifierList;


class ConcreteWidgetDeclaration extends ConcreteCategoryDeclaration {
    constructor(name, derivedFrom, methods) {
        derivedFrom = derivedFrom==null ? null : new IdentifierList(derivedFrom);
        super(name, null, derivedFrom, methods);
        return this;
    }

    isWidget(context) {
        return true;
    }

    getProperties(context) {
        if(typeof(this.properties)=="undefined") {
            this.properties = null;
            // don't bubble up buried problems
            const savedProblems = context.problemListener.problems;
            context.problemListener.problems = [];
            try {
                this.check(context);
            } finally {
                context.problemListener.problems = savedProblems;
            }
        }
        return this.properties;
    }

    getDeclarationType() {
        return "Widget";
    }

    categoryTypeToEDialect(writer) {
        if(this.derivedFrom==null)
            writer.append("widget");
        else
            this.derivedFrom.toDialect(writer, true);
    }

    categoryTypeToODialect(writer) {
        writer.append("widget");
    }

    categoryTypeToMDialect(writer) {
        writer.append("widget");
    }

    declareRoot(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        const parent = this.derivedFrom!=null && this.derivedFrom.length>0 ? this.derivedFrom[0] : null;
        transpiler.append("function ").append(this.name).append("() {");
        transpiler.indent();
        this.transpileGetterSetterAttributes(transpiler);
        this.transpileSuperConstructor(transpiler);
        this.transpileLocalAttributes(transpiler);
        transpiler.append("return this;");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        if(parent!=null)
            transpiler.append(this.name).append(".prototype = Object.create(").append(parent.toString()).append(".prototype);").newLine();
        else
            transpiler.append(this.name).append(".prototype = Object.create(React.Component.prototype);").newLine();
        transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
        transpiler = transpiler.newInstanceTranspiler(new CategoryType(this.id));
        this.transpileLoaders(transpiler);
        this.transpileMethods(transpiler);
        this.transpileGetterSetters(transpiler);
        transpiler.flush();
        return true;
    }

    transpileRootConstructor(transpiler) {
        return transpiler.append("React.Component.call(this);");
    }
}

exports.ConcreteWidgetDeclaration = ConcreteWidgetDeclaration;
