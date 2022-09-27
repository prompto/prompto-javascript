import INativeCategoryBinding from '../../../main/prompto/grammar/INativeCategoryBinding.ts'

export default class PythonNativeCategoryBinding extends INativeCategoryBinding {

    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module;
    }
}


