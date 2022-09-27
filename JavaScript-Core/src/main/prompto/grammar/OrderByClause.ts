import Section from '../parser/Section'
import {IdentifierList} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IQueryBuilder} from "../store";

export default class OrderByClause extends Section {

    ids: IdentifierList;
    descending: boolean;

    constructor(ids: IdentifierList, descending: boolean) {
        super();
        this.ids = ids;
        this.descending = descending || false;
    }

    toDialect(writer: CodeWriter): void {
        this.ids.forEach(id => {
            writer.append(id.toString());
            writer.append(".");
        });
        writer.trimLast(1);
        if(this.descending)
            writer.append(" descending");
    }

    checkQuery(context: Context) {
        const id = this.ids[0];
        const decl = context.findAttribute(id.name);
        if(decl==null)
            context.problemListener.reportUnknownAttribute(id, id.name);
    }

    interpretQuery(context: Context, query: IQueryBuilder) {
        const id = this.ids[0];
        const info = context.findAttribute(id.name)!.getAttributeInfo();
        query.orderBy(info, this.descending);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        const id = this.ids[0];
        const info = transpiler.context.findAttribute(id.name)!.getAttributeInfo();
        transpiler.append(builderName).append(".addOrderByClause(").append(info.toTranspiled()).append(", ").appendBoolean(this.descending).append(");").newLine();
    }
}
