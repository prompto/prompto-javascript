const Literal = require("./Literal").Literal;
const ListValue = require("../value/ListValue").ListValue;
const ListType = require("../type/ListType").ListType;
const MissingType = require("../type/MissingType").MissingType;
const ExpressionList = require("../utils/ExpressionList").ExpressionList;
const DecimalType = require("../type/DecimalType").DecimalType;
const IntegerType = require("../type/IntegerType").IntegerType;
const CharacterType = require("../type/CharacterType").CharacterType;
const TextType = require("../type/TextType").TextType;
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const TextValue = require("../value/TextValue").TextValue;
const inferExpressionsType = require("../utils/TypeUtils").inferExpressionsType;
const List = require("../intrinsic/List").List;

class ListLiteral extends Literal {
    constructor(mutable, expressions) {
        if(typeof(mutable)!=typeof(true))
            throw "mutable!";
        expressions = expressions || new ExpressionList();
        super("[" + expressions.toString() + "]", new ListValue(MissingType.instance));
        this.itemType = null;
        this.mutable = mutable;
        this.expressions = expressions;
        return this;
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


exports.ListLiteral = ListLiteral;
