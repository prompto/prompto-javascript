import INativeCategoryBinding from '../grammar/INativeCategoryBinding'
import {PythonModule} from "./index";
import {CodeWriter} from "../utils";

export default class PythonNativeCategoryBinding implements INativeCategoryBinding {

    identifier: string;
    module?: PythonModule;

    constructor(identifier: string, module?: PythonModule) {
         this.identifier = identifier;
        this.module = module;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }

}


