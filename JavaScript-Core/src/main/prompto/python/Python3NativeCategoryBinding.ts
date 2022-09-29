import PythonNativeCategoryBinding from './PythonNativeCategoryBinding'
import {CodeWriter} from "../utils";

export default class Python3NativeCategoryBinding extends PythonNativeCategoryBinding {

    constructor(binding: PythonNativeCategoryBinding) {
        super(binding.identifier, binding.module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python3: ");
        super.toDialect(writer);
    }

}


