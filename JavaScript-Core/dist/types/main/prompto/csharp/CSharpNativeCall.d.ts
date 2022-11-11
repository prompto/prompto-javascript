import NativeCall from '../statement/NativeCall';
import { CSharpStatement } from "./index";
import { CodeWriter } from "../utils";
export default class CSharpNativeCall extends NativeCall {
    statement: CSharpStatement;
    constructor(statement: CSharpStatement);
    toDialect(writer: CodeWriter): void;
}
