import NativeCategoryBinding from "../grammar/NativeCategoryBinding"

export default class PythonNativeCategoryBinding extends NativeCategoryBinding {

    constructor(identifier, module) {
        super();
        this.identifier = identifier;
        this.module = module;
    }
}


