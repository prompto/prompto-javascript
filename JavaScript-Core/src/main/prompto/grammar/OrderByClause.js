import Section from '../parser/Section.ts'

export default class OrderByClause extends Section {

    constructor(ids, descending) {
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

    checkQuery(context) {
        const id = this.ids[0];
        const decl = context.findAttribute(id.name);
        if(decl==null)
            context.problemListener.reportUnknownAttribute(id, id.name);
    }

    interpretQuery(context, query) {
        const id = this.ids[0];
        const info = context.findAttribute(id.name).getAttributeInfo();
        query.addOrderByClause(info, this.descending);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpileQuery(transpiler, builder) {
        const id = this.ids[0];
        const info = transpiler.context.findAttribute(id.name).getAttributeInfo();
        transpiler.append(builder).append(".addOrderByClause(").append(info.toTranspiled()).append(", ").append(this.descending).append(");").newLine();
    }
}
