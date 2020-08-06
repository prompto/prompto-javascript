const PythonNativeCategoryBinding = require("./PythonNativeCategoryBinding").PythonNativeCategoryBinding;

class Python3NativeCategoryBinding extends PythonNativeCategoryBinding {
    constructor(binding) {
        super(binding.identifier, binding.module);
        return this;
    }

    toDialect(writer) {
        writer.append("Python3: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }
}

exports.Python3NativeCategoryBinding = Python3NativeCategoryBinding;

