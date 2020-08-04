var PythonNativeCategoryBinding = require("./PythonNativeCategoryBinding").PythonNativeCategoryBinding;

class Python2NativeCategoryBinding extends PythonNativeCategoryBinding {
    constructor(binding) {
        super(binding.identifier, binding.module);
        return this;
    }

    toDialect(writer) {
        writer.append("Python2: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }
}

exports.Python2NativeCategoryBinding = Python2NativeCategoryBinding;

