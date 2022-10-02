import PythonNativeCall from './PythonNativeCall'
import {CodeWriter} from "../utils";
import {PythonModule, PythonStatement} from "./index";

export default class Python2NativeCall extends PythonNativeCall {

    constructor(statement: PythonStatement, module?: PythonModule) {
        super(statement, module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python2: ");
        super.toDialect(writer);
    }
}
