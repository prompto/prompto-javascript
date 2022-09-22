import ConcreteCategoryDeclaration from './ConcreteCategoryDeclaration';
import {CodeWriter, getTypeName} from '../utils'
import { NativeInstance } from '../value'
import { JavaScriptNativeCategoryBinding } from '../javascript'
import { CategoryType } from '../type'
import { SyntaxError } from '../error'
import { Any } from '../intrinsic';
import {Context, Transpiler} from "../runtime";
import {Identifier, IdentifierList, NativeCategoryBindingList} from "../grammar";
import {MethodDeclaration} from "./index";
import {Section} from "../parser";

export default class NativeCategoryDeclaration extends ConcreteCategoryDeclaration {

    categoryBindings: NativeCategoryBindingList;
    // attributeBindings: NativeAttributeBinding[];
    bound?: (() => any) | null;

    constructor(id: Identifier, attributes: IdentifierList | null, categoryBindings: NativeCategoryBindingList, attributeBindings: any, methods: MethodDeclaration[] | null) {
        super(id, attributes, null, methods);
        this.categoryBindings = categoryBindings;
        // this.attributeBindings = attributeBindings;
    }

    register(context: Context): void {
        super.register(context);
        const bound = this.getBoundFunction(false);
        if(bound!=null) {
            const name = getTypeName(bound);
            context.registerNativeBinding(name!, this);
        }
    }

    toEDialect(writer: CodeWriter): void {
        this.protoToEDialect(writer, false, true);
        this.bindingsToEDialect(writer);
        if(this.methods.length>0) {
            writer.append("and methods:");
            writer.newLine();
            this.methodsToEDialect(writer, this.methods);
        }
    }

    categoryTypeToEDialect(writer: CodeWriter): void {
        writer.append("native category");
    }

    bindingsToEDialect(writer: CodeWriter): void {
        writer.indent();
        this.categoryBindings.toDialect(writer);
        writer.dedent();
        writer.newLine();
    }

    toODialect(writer: CodeWriter): void {
        const hasBody = true; // always one
        this.allToODialect(writer, hasBody);
    }

    categoryTypeToODialect(writer: CodeWriter): void {
        writer.append("native category");
    }

    bodyToODialect(writer: CodeWriter): void {
        this.categoryBindings.toDialect(writer);
        if(this.methods.length>0) {
            writer.newLine();
            writer.newLine();
            this.methodsToODialect(writer, this.methods);
        }
    }

    toMDialect(writer: CodeWriter): void {
        this.protoToMDialect(writer, null);
        writer.indent();
        writer.newLine();
        this.categoryBindings.toDialect(writer);
        this.methods.forEach(method => {
            if(method.comments) {
                method.comments.forEach(cmt => {
                    cmt.toDialect(writer);
                });
            }
            if(method.annotations) {
                method.annotations.forEach(ann => {
                    ann.toDialect(writer);
                });
            }
            const w = writer.newMemberWriter();
            method.toMDialect(w);
            writer.newLine();
        });
        writer.dedent();
        writer.newLine();
    }

    categoryTypeToMDialect(writer: CodeWriter): void {
        writer.append("native category");
    }

    newInstance(context: Context) {
        return new NativeInstance(context, this);
    }

    getBoundFunction(fail: boolean): (() => any) | null {
        if(!this.bound) {
            const binding = this.getBinding(fail);
            if(binding!=null) {
                const bound = binding.resolve();
                if(bound)
                    this.bound = bound;
                else if(fail)
                    throw new SyntaxError("No JavaScript function:" + binding.toString());
            }
        }
        return this.bound || null;
    }

    getBinding(fail: boolean): JavaScriptNativeCategoryBinding | null {
        const filtered = this.categoryBindings.find(binding => binding instanceof JavaScriptNativeCategoryBinding);
        if(filtered)
            return filtered as JavaScriptNativeCategoryBinding;
        else if(fail)
            throw new SyntaxError("Missing JavaScript binding for category: " + this.name);
        else
            return null;
    }

    declare(transpiler: Transpiler): void {
        transpiler.declare(this);
        if(this.name==="Any")
            transpiler.register(Any);
    }

    transpile(transpiler: Transpiler): void {
        const binding = this.getBinding(true);
        if(!binding)
            return;
        const bound = binding.resolve();
        if(!bound)
            return;
        binding.transpile(transpiler);
        const name = getTypeName(bound);
        transpiler.append("function ").append("new_").append(this.name).append("(values) {").indent();
        transpiler.append("values = values || {};").newLine();
        transpiler.append("var value = new ").append(name!).append("();").newLine();
        if(this.attributes) {
            this.attributes.forEach(attr => {
                transpiler.append("value.").append(attr.name).append(" = values.hasOwnProperty('").append(attr.name).append("') ? values.").append(attr.name).append(" : null;").newLine();
            }, this);
        }
        transpiler.append("return value;").newLine();
        transpiler.dedent().append("}").newLine();
        transpiler = transpiler.newInstanceTranspiler(new CategoryType(this.id));
        this.transpileMethods(transpiler);
        this.transpileGetterSetters(transpiler);
        transpiler.flush();

    }

    locateSectionAtLine(line: number): Section | null {
        for(let i=0;i<this.methods.length;i++) {
            const section = this.methods[i].locateSectionAtLine(line);
            if(section)
                return section;
        }
        return null;
    }
}
