import PythonNativeCategoryBinding from './PythonNativeCategoryBinding.js'

export default class Python2NativeCategoryBinding extends PythonNativeCategoryBinding {

    constructor(binding) {
        super(binding.identifier, binding.module);
    }

    toDialect(writer) {
        writer.append("Python2: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }
}


