const NativeCategoryBinding = require("./../grammar/NativeCategoryBinding").NativeCategoryBinding;
if(global && !global.Event)
    global.Event = () => {};

class JavaScriptNativeCategoryBinding extends NativeCategoryBinding {
    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module || null;
        return this;
    }

    resolve() {
        const m = this.resolve_module();
        if(m==null) {
            try {
                return eval(this.identifier);
            } catch(e) {
                return null;
            }
        } else {
            return m[this.identifier] || null;
        }
    }

    resolve_module(context) {
        if (this.module == null) {
            return null;
        } else {
            return this.module.resolve();
        }
    }

    resolveWidget(context) {
        const m = this.resolve_widget_module();
        if(m==null) {
            try {
                return eval(this.identifier);
            } catch(e) {
                return null;
            }
        } else {
            return m[this.identifier] || null;
        }
    }

    resolve_widget_module(context) {
        if (this.module == null) {
            return null;
        } else {
            return eval(this.module.toString());
        }
    }

    toDialect(writer) {
        writer.append("JavaScript: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }

    transpile(transpiler) {
        if(this.module)
            this.module.transpile(transpiler, this.identifier);
    }

    transpileWidget(transpiler) {
        // assumption is that required module is already imported through other means
        if(this.module!=null) {
            transpiler.append("var ").append(this.identifier).append(" = ");
            this.module.transpileWidget(transpiler);
            transpiler.append(".").append(this.identifier).append(";").newLine();
        }
    }
}

JavaScriptNativeCategoryBinding.prototype.creator = JavaScriptNativeCategoryBinding;

exports.JavaScriptNativeCategoryBinding = JavaScriptNativeCategoryBinding;

