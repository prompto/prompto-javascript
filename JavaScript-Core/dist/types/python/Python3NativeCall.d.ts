import PythonNativeCall from './PythonNativeCall';
import { PythonModule, PythonStatement } from "./index";
import { CodeWriter } from "../utils";
export default class Python3NativeCall extends PythonNativeCall {
    constructor(statement: PythonStatement, module?: PythonModule);
    toDialect(writer: CodeWriter): void;
}
