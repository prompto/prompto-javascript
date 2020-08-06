const NativeCategoryBinding = require("./../grammar/NativeCategoryBinding").NativeCategoryBinding;

class PythonNativeCategoryBinding extends NativeCategoryBinding {
    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module;
        return this;
    }
}

exports.PythonNativeCategoryBinding = PythonNativeCategoryBinding;

