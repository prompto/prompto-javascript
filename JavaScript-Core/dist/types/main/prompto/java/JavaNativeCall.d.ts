import NativeCall from '../statement/NativeCall';
import { JavaStatement } from "./index";
import { CodeWriter } from "../utils";
export default class JavaNativeCall extends NativeCall {
    statement: JavaStatement;
    constructor(statement: JavaStatement);
    toDialect(writer: CodeWriter): void;
}
