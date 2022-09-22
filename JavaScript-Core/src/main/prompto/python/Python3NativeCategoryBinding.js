import PythonNativeCategoryBinding from './PythonNativeCategoryBinding.js'

export default class Python3NativeCategoryBinding extends PythonNativeCategoryBinding {

    constructor(binding) {
        super(binding.identifier, binding.module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python3: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }
}


