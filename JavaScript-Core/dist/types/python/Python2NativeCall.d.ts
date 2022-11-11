import PythonNativeCall from './PythonNativeCall';
import { CodeWriter } from "../utils";
import { PythonModule, PythonStatement } from "./index";
export default class Python2NativeCall extends PythonNativeCall {
    constructor(statement: PythonStatement, module?: PythonModule);
    toDialect(writer: CodeWriter): void;
}
