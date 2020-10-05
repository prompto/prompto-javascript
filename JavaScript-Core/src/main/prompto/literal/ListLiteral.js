import Literal from './Literal.js'
import { ListType, MissingType, CharacterType, TextType, DecimalType, IntegerType } from '../type/index.js'
import { ListValue, TextValue, DecimalValue } from '../value/index.js'
import { List } from '../intrinsic/index.js'
import { ExpressionList } from '../expression/index.js'
import { inferExpressionsType } from '../utils/index.js'

export default class ListLiteral extends Literal {

    constructor(mutable, expressions) {
        if(typeof(mutable)!=typeof(true))
            throw "mutable!";
        expressions = expressions || new ExpressionList();
        super("[" + expressions.toString() + "]", new ListValue(MissingType.instance));
        this.itemType = null;
        this.mutable = mutable;
        this.expressions = expressions;
    }

    check(context) {
        if(this.itemType==null) {
            this.itemType = inferExpressionsType(context, this.expressions);
            this.type = new ListType(this.itemType);
        }
        return this.type;
    }

    interpret(context) {
        if(this.expressions.length) {
            const self = this;
            this.check(context); // force computation of itemType
            const list = new ListValue(this.itemType, null, null, this.mutable);
            this.expressions.forEach(expression => {
                let item = expression.interpret(context);
                item = self.interpretPromotion(item);
                list.add(item);
            });
            return list;
        } else
            return this.value;
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
        if(this.mutable)
            writer.append("mutable ");
        if(this.expressions!=null) {
            writer.append('[');
            this.expressions.toDialect(writer);
            writer.append(']');
        } else
            writer.append("[]");
    }

    declare(transpiler) {
        transpiler.require(List);
        if(this.expressions!=null)
            this.expressions.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new List(").append(this.mutable).append(", [");
        if(this.expressions!=null) {
            this.expressions.transpile(transpiler);
            transpiler.append('])');
        } else
            transpiler.append("])");
    }
}


