const ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
const getTypeName = require("../javascript/JavaScriptUtils").getTypeName;
const NativeInstance = require("../value/NativeInstance").NativeInstance;
const JavaScriptNativeCategoryBinding = require("../javascript/JavaScriptNativeCategoryBinding").JavaScriptNativeCategoryBinding;
const CategoryType = require("../type/CategoryType").CategoryType;

class NativeCategoryDeclaration extends ConcreteCategoryDeclaration {
    constructor(id, attributes, categoryBindings, attributeBindings, methods) {
        super(id, attributes, null, methods);
        this.categoryBindings = categoryBindings;
        this.attributeBindings = attributeBindings;
        this.bound = null;
        return this;
    }

    register(context) {
        super.register(context);
        const bound = this.getBoundFunction(false);
        if(bound!=null) {
            const name = getTypeName(bound);
            context.registerNativeBinding(name, this);
        }
    }

    toEDialect(writer) {
        this.protoToEDialect(writer, false, true);
        this.bindingsToEDialect(writer);
        if(this.methods.length>0) {
            writer.append("and methods:");
            writer.newLine();
            this.methodsToEDialect(writer, this.methods);
        }
    }

    categoryTypeToEDialect(writer) {
        writer.append("native category");
    }

    bindingsToEDialect(writer) {
        writer.indent();
        this.categoryBindings.toDialect(writer);
        writer.dedent();
        writer.newLine();
    }

    toODialect(writer) {
        const hasBody = true; // always one
        this.allToODialect(writer, hasBody);
    }

    categoryTypeToODialect(writer) {
        writer.append("native category");
    }

    bodyToODialect(writer) {
        this.categoryBindings.toDialect(writer);
        if(this.methods.length>0) {
            writer.newLine();
            writer.newLine();
            this.methodsToODialect(writer, this.methods);
        }
    }

    toMDialect(writer) {
        this.protoToMDialect(writer, null);
        writer.indent();
        writer.newLine();
        this.categoryBindings.toDialect(writer);
        this.methods.forEach(method => {
            const w = writer.newMemberWriter();
            method.toDialect(w);
            writer.newLine();
        });
        writer.dedent();
        writer.newLine();
    }

    categoryTypeToMDialect(writer) {
        writer.append("native category");
    }

    newInstance(context) {
        return new NativeInstance(context, this);
    }

    getBoundFunction(fail) {
        if(this.bound==null) {
            const binding = this.getBinding(fail);
            if(binding!=null) {
                this.bound = binding.resolve();
                if(fail && this.bound==null)
                    throw new SyntaxError("No JavaScript function:" + binding.toString());
            }
        }
        return this.bound;
    }

    getBinding(fail) {
        for(let i=0;i<this.categoryBindings.length;i++) {
            if(this.categoryBindings[i] instanceof JavaScriptNativeCategoryBinding) {
                return this.categoryBindings[i];
            }
        }
        if(fail)
            throw new SyntaxError("Missing JavaScript binding for category: " + this.name);
        else
            return null;
    }

    declare(transpiler) {
        transpiler.declare(this);
        if(this.name==="Any")
            transpiler.register(require("../intrinsic/Any").Any);
    }

    transpile(transpiler) {
        const binding = this.getBinding(true);
        binding.transpile(transpiler);
        const bound = binding.resolve();
        const name = getTypeName(bound);
        transpiler.append("function ").append("new_").append(this.name).append("(values) {").indent();
        transpiler.append("values = values || {};").newLine();
        transpiler.append("var value = new ").append(name).append("();").newLine();
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

    locateSectionAtLine(line) {
        for(let i=0;i<this.methods.length;i++) {
            const s = this.methods[i].locateSectionAtLine(line);
            if(s)
                return s;
        }
        return null;
    }
}

exports.NativeCategoryDeclaration = NativeCategoryDeclaration;