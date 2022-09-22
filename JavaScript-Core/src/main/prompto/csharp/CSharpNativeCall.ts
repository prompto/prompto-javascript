import NativeCall from '../statement/NativeCall'
import {CSharpStatement} from "./index";
import {CodeWriter} from "../utils";

export default class CSharpNativeCall extends NativeCall {

    statement: CSharpStatement;

    constructor(statement: CSharpStatement) {
        super();
        this.statement = statement;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("C#: ");
        this.statement.toDialect(writer);
    }
}

