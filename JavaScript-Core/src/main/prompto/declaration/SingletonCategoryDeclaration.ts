import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration'
import { CategoryType } from '../type'
import {ConcreteMethodDeclaration, IMethodDeclaration} from '../declaration'
import {Context, Transpiler} from '../runtime'
import {Identifier, IdentifierList} from "../grammar";
import {CodeWriter} from "../utils";

export default class SingletonCategoryDeclaration extends ConcreteCategoryDeclaration {

    constructor(id: Identifier, attributes: IdentifierList, methods: IMethodDeclaration[]) {
        super(id, attributes, null, methods);
    }

    categoryTypetoEDialect(writer: CodeWriter): void {
        writer.append("singleton");
    }

    categoryTypetoODialect(writer: CodeWriter): void {
        writer.append("singleton");
    }

    categoryTypetoMDialect(writer: CodeWriter): void {
        writer.append("singleton");
    }


    getInitializeMethod(context: Context): ConcreteMethodDeclaration | null {
        this.registerMethods(context);
        if(this.methodsMap && this.methodsMap.has("initialize")) {
            const decl = this.methodsMap.get("initialize");
            if(decl) {
                const method = decl.getFirst();
                if(method instanceof ConcreteMethodDeclaration)
                    return method;
            }
        }
        return null;
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("function ").append(this.name).append("() {").indent();
        transpiler.append("$Root.call(this);").newLine();
        transpiler.append("this.$mutable = true;").newLine();
        transpiler.append("return this;").dedent();
        transpiler.append("};").newLine();
        transpiler.append(this.name).append(".prototype = Object.create($Root.prototype);").newLine();
        transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
        transpiler.append(this.name).append(".instance = new ").append(this.name).append("();").newLine();
        if(this.attributes) {
            this.attributes.forEach(id => transpiler.append(this.name).append(".instance.").append(id.name).append(" = null;").newLine(), this);
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
