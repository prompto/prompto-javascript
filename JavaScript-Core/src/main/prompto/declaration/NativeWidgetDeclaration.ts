import NativeCategoryDeclaration from './NativeCategoryDeclaration'
import { SyntaxError } from '../error'
import {Identifier, NativeCategoryBindingList} from "../grammar";
import {MethodDeclaration} from "./index";
import {Context, Transpiler} from "../runtime";
import {JsxProperty} from "../jsx";
import {CodeWriter} from "../utils";

export default class NativeWidgetDeclaration extends NativeCategoryDeclaration {

    properties?: JsxProperty[] | null;

    constructor(id: Identifier, categoryBindings: NativeCategoryBindingList, methods: MethodDeclaration[]) {
        super(id, null, categoryBindings, null, methods);
    }

    isWidget(context: Context): boolean {
        return true;
    }

    getPageWidgetOf(): string | null {
        return null;
    }

    getProperties(context: Context): JsxProperty[] | null {
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

    getDeclarationType(): string {
        return "Widget";
    }

    getBoundFunction(fail: boolean): (() => any) | null {
        if(!this.bound) {
            const binding = this.getBinding(fail);
            if(binding!=null) {
                const bound = binding.resolveWidget();
                if(bound)
                    this.bound = bound;
                else if(fail)
                    throw new SyntaxError("No JavaScript function:" + binding.toString());
            }
        }
        return this.bound || null;
    }

    categoryTypeToEDialect(writer: CodeWriter): void {
        writer.append("native widget");
    }

    categoryTypeToODialect(writer: CodeWriter): void {
        writer.append("native widget");
    }

    categoryTypeToMDialect(writer: CodeWriter): void {
        writer.append("native widget");
    }

    transpile(transpiler: Transpiler): void {
        const binding = this.getBinding(false);
        if(binding)
            binding.transpileWidget(transpiler);
    }
}
