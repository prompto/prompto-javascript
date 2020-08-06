var Literal = require("./Literal").Literal;
var ListValue = require("../value/ListValue").ListValue;
var ListType = require("../type/ListType").ListType;
var MissingType = require("../type/MissingType").MissingType;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;
var DecimalType = require("../type/DecimalType").DecimalType;
var IntegerType = require("../type/IntegerType").IntegerType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;
var inferExpressionsType = require("../utils/TypeUtils").inferExpressionsType;
var List = require("../intrinsic/List").List;

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
            var self = this;
            this.check(context); // force computation of itemType
            var list = new ListValue(this.itemType, null, null, this.mutable);
            this.expressions.forEach(expression => {
                var item = expression.interpret(context);
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
