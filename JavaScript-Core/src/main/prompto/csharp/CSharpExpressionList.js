import ObjectList from '../utils/ObjectList.js'

export default class CSharpExpressionList extends ObjectList {
  
    constructor(expression) {
        super();
        expression = expression || null;
        if(expression!==null) {
            this.add(expression);
        }
    }

    toDialect(writer) {
        if(this.length>0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
