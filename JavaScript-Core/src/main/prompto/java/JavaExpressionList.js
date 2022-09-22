import ObjectList from '../../../main/prompto/utils/ObjectList.ts';

export default class JavaExpressionList extends ObjectList {

    constructor(expression) {
        super();
        expression = expression || null;
        if(expression!==null) {
            this.add(expression);
        }
    }

    toDialect(writer: CodeWriter): void {
        if(this.length>0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
