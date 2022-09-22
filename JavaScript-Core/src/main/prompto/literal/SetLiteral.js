import Literal from '../../../main/prompto/literal/Literal.ts'
import { ExpressionList } from '../expression'
import { SetValue, DecimalValue, TextValue } from '../value'
import { SetType, IntegerType, DecimalType, MissingType, TextType, CharacterType } from '../type'
import { inferExpressionsType } from '../utils'
import StrictSet from "../intrinsic/StrictSet.js"

export default class SetLiteral extends Literal {

    constructor(expressions) {
        expressions = expressions || new ExpressionList();
        super("<" + expressions.toString() + ">", new SetValue(MissingType.instance));
        this.itemType = null;
        this.expressions = expressions;
    }

    check(context: Context): Type {
        if(this.itemType==null) {
            this.itemType = inferExpressionsType(context, this.expressions);
            this.type = new SetType(this.itemType);
        }
        return this.type;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(StrictSet);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new StrictSet([");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context: Context): Value {
        const self = this;
        this.check(context); // force computation of itemType
        const value = new SetValue(this.itemType);
        this.expressions.forEach(expression => {
            let item = expression.interpret(context);
            item = self.interpretPromotion(item);
            value.add(item);
        });
        return value;
    }

    interpretPromotion(item) {
        if (item == null)
            return item;
        if (DecimalType.instance == this.itemType && item.type == IntegerType.instance)
            return new DecimalValue(item.DecimalValue());
        else if (TextType.instance == this.itemType && item.type == CharacterType.instance)
            return new TextValue(item.value);
        else
            return item;
    }

    toDialect(writer: CodeWriter): void {
        if(this.expressions!=null) {
            writer.append('<');
            this.expressions.toDialect(writer);
            writer.append('>');
        } else
            writer.append("< >");
    }
}

