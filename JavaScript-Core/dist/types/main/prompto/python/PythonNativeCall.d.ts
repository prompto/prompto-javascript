import NativeCall from '../statement/NativeCall';
import { PythonModule, PythonStatement } from "./index";
import { CodeWriter } from "../utils";
export default class PythonNativeCall extends NativeCall {
    statement: PythonStatement;
    module?: PythonModule;
    constructor(statement: PythonStatement, module?: PythonModule);
    toDialect(writer: CodeWriter): void;
}
