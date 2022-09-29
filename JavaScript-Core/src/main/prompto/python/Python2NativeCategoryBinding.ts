import PythonNativeCategoryBinding from './PythonNativeCategoryBinding'
import {CodeWriter} from "../utils";

export default class Python2NativeCategoryBinding extends PythonNativeCategoryBinding {

    constructor(binding: PythonNativeCategoryBinding) {
        super(binding.identifier, binding.module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python2: ");
        super.toDialect(writer);
    }
}


