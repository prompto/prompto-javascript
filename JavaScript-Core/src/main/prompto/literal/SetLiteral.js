var Literal = require("./Literal").Literal;
var SetValue = require("../value/SetValue").SetValue;
var SetType = require("../type/SetType").SetType;
var MissingType = require("../type/MissingType").MissingType;
var DecimalType = require("../type/DecimalType").DecimalType;
var IntegerType = require("../type/IntegerType").IntegerType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;
var inferExpressionsType = require("../utils/TypeUtils").inferExpressionsType;

class SetLiteral extends Literal {
    constructor(expressions) {
        expressions = expressions || new ExpressionList();
        super("<" + expressions.toString() + ">", new SetValue(MissingType.instance));
        this.itemType = null;
        this.expressions = expressions;
        return this;
    }

    check(context) {
        if(this.itemType==null) {
            this.itemType = inferExpressionsType(context, this.expressions);
            this.type = new SetType(this.itemType);
        }
        return this.type;
    }

    declare(transpiler) {
        var StrictSet = require("../intrinsic/StrictSet").StrictSet;
        transpiler.require(StrictSet);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new StrictSet([");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context) {
        var self = this;
        this.check(context); // force computation of itemType
        var value = new SetValue(this.itemType);
        this.expressions.forEach(function(expression) {
            var item = expression.interpret(context);
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

exports.SetLiteral = SetLiteral;
