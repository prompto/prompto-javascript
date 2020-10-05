import NativeCategoryBinding from '../grammar/NativeCategoryBinding.js'

export default class PythonNativeCategoryBinding extends NativeCategoryBinding {

    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module;
    }
}


