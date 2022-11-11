import { CodeWriter } from "../utils";
export default class PythonModule {
    ids: string[];
    constructor(ids: string[]);
    toDialect(writer: CodeWriter): void;
}
