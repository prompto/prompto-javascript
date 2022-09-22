import NativeCategoryBinding from '../../../main/prompto/grammar/NativeCategoryBinding.ts'

export default class PythonNativeCategoryBinding extends NativeCategoryBinding {

    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module;
    }
}


