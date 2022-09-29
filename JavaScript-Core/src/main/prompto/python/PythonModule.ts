import {CodeWriter} from "../utils";

export default class PythonModule {

    ids: string[];

    constructor(ids: string[]) {
        this.ids = ids;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(" from module: ");
        this.ids.forEach(id => {
            writer.append(id);
            writer.append('.');
        });
        writer.trimLast(1);
    }
}
