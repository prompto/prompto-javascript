import NativeCall from '../statement/NativeCall'
import {PythonModule, PythonStatement} from "./index";
import {CodeWriter} from "../utils";

export default class PythonNativeCall extends NativeCall {

    statement: PythonStatement;
    module?: PythonModule;

    constructor(statement: PythonStatement, module?: PythonModule) {
        super();
        this.statement = statement;
        this.module = module;
    }

    toDialect(writer: CodeWriter): void {
        this.statement.toDialect(writer);
    }
}

