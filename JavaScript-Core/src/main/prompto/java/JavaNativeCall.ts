import NativeCall from '../statement/NativeCall'
import {JavaStatement} from "./index";
import {CodeWriter} from "../utils";

export default class JavaNativeCall extends NativeCall {

    statement: JavaStatement;

    constructor(statement: JavaStatement) {
        super();
        this.statement = statement;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("Java: ");
        this.statement.toDialect(writer);
    }
}
