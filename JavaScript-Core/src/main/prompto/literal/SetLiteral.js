import Literal from './Literal.js'
import { ExpressionList } from '../expression/index.js'
import { SetValue, DecimalValue, TextValue } from '../value/index.js'
import { SetType, IntegerType, DecimalType, MissingType, TextType, CharacterType } from '../type/index.js'
import { inferExpressionsType } from '../utils/index.js'
import StrictSet from "../intrinsic/StrictSet.js"

export default class SetLiteral extends Literal {

    constructor(expressions) {
        expressions = expressions || new ExpressionList();
        super("<" + expressions.toString() + ">", new SetValue(MissingType.instance));
        this.itemType = null;
        this.expressions = expressions;
    }

    check(context) {
        if(this.itemType==null) {
            this.itemType = inferExpressionsType(context, this.expressions);
            this.type = new SetType(this.itemType);
        }
        return this.type;
    }

    declare(transpiler) {
        transpiler.require(StrictSet);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new StrictSet([");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context) {
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

    toDialect(writer) {
        if(this.expressions!=null) {
            writer.append('<');
            this.expressions.toDialect(writer);
            writer.append('>');
        } else
            writer.append("< >");
    }
}

