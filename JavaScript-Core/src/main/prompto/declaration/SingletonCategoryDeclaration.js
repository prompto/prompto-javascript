import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration.js'
import { CategoryType } from '../type/index.js'
import { ConcreteMethodDeclaration } from '../declaration/index.js'
import { MethodDeclarationMap } from '../runtime/index.js'

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


    getInitializeMethod(context) {
        this.registerMethods(context);
        const decl = this.methodsMap["initialize"];
        if(decl instanceof MethodDeclarationMap) {
            const method = decl.getFirst();
            if(method instanceof ConcreteMethodDeclaration)
                return method;
        }
        return null;
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
        if(this.getInitializeMethod(transpiler.context)!=null)
            transpiler.addInitializer(this.name + ".instance.initialize();");
        instance.flush();
        transpiler.flush();
    }
}
