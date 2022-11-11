import PythonNativeCategoryBinding from './PythonNativeCategoryBinding';
import { CodeWriter } from "../utils";
export default class Python2NativeCategoryBinding extends PythonNativeCategoryBinding {
    constructor(binding: PythonNativeCategoryBinding);
    toDialect(writer: CodeWriter): void;
}
