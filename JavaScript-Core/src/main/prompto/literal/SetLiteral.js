const Literal = require("./Literal").Literal;
const SetValue = require("../value/SetValue").SetValue;
const SetType = require("../type/SetType").SetType;
const MissingType = require("../type/MissingType").MissingType;
const DecimalType = require("../type/DecimalType").DecimalType;
const IntegerType = require("../type/IntegerType").IntegerType;
const CharacterType = require("../type/CharacterType").CharacterType;
const TextType = require("../type/TextType").TextType;
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const TextValue = require("../value/TextValue").TextValue;
const ExpressionList = require("../utils/ExpressionList").ExpressionList;
const inferExpressionsType = require("../utils/TypeUtils").inferExpressionsType;

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
        const StrictSet = require("../intrinsic/StrictSet").StrictSet;
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

exports.SetLiteral = SetLiteral;
