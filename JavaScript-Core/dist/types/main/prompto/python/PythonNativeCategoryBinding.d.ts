import INativeCategoryBinding from '../grammar/INativeCategoryBinding';
import { PythonModule } from "./index";
import { CodeWriter } from "../utils";
export default class PythonNativeCategoryBinding implements INativeCategoryBinding {
    identifier: string;
    module?: PythonModule;
    constructor(identifier: string, module?: PythonModule);
    toDialect(writer: CodeWriter): void;
}
