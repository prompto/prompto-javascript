import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration'
import {Identifier, IdentifierList} from '../grammar'
import { CategoryType } from '../type'
import {IMethodDeclaration, IWidgetDeclaration} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {PropertyMap} from "../property";
import {IDeclarationInfo, IWidgetInfo} from "../runtime/Catalog";

export default class ConcreteWidgetDeclaration extends ConcreteCategoryDeclaration implements IWidgetDeclaration {

    properties?: PropertyMap | null;

    constructor(id: Identifier, derivedFrom: Identifier | null, methods: IMethodDeclaration[] | null) {
        const derivedFromList = derivedFrom ? new IdentifierList(null, derivedFrom) : null;
        super(id, null, derivedFromList, methods);
    }

    isWidget(context: Context): boolean {
        return true;
    }

    toDeclarationInfo(): IWidgetInfo {
        return { name: this.name, dialect: this.dialect.name, pageWidgetOf: this.getPageWidgetOf()};
    }

    getProperties(context: Context): PropertyMap | null {
        if(typeof(this.properties)=="undefined") {
            this.properties = null;
            // don't bubble up buried problems
            const savedProblems = context.problemListener.problems;
            context.problemListener.problems = [];
            try {
                this.check(context); // will populate properties
            } finally {
                context.problemListener.problems = savedProblems;
            }
        }
        return this.properties;
    }

    getDeclarationType(): string {
        return "Widget";
    }

    categoryTypeToEDialect(writer: CodeWriter): void {
        if(this.derivedFrom)
            this.derivedFrom.toDialect(writer, true);
        else
            writer.append("widget");
    }

    categoryTypeToODialect(writer: CodeWriter): void {
        writer.append("widget");
    }

    categoryTypeToMDialect(writer: CodeWriter): void {
        writer.append("widget");
    }

    declareRoot(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
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
    }

    transpileRootConstructor(transpiler: Transpiler): Transpiler {
        return transpiler.append("React.Component.call(this);");
    }
}
