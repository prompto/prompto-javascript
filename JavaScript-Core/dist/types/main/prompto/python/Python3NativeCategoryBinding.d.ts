import PythonNativeCategoryBinding from './PythonNativeCategoryBinding';
import { CodeWriter } from "../utils";
export default class Python3NativeCategoryBinding extends PythonNativeCategoryBinding {
    constructor(binding: PythonNativeCategoryBinding);
    toDialect(writer: CodeWriter): void;
}
