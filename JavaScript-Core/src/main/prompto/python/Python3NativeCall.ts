import PythonNativeCall from './PythonNativeCall'
import {PythonModule, PythonStatement} from "./index";
import {CodeWriter} from "../utils";

export default class Python3NativeCall extends PythonNativeCall {

    constructor(statement: PythonStatement, module: PythonModule) {
        super(statement, module);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Python3: ");
        super.toDialect(writer);
    }
}

