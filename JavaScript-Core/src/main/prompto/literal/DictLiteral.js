var Literal = require("./Literal").Literal;
var Dictionary = require("../intrinsic/Dictionary").Dictionary;
var DictEntryList = require("./DictEntryList").DictEntryList;
var DictionaryValue = require("../value/DictionaryValue").DictionaryValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var MissingType = require("../type/MissingType").MissingType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var inferElementType = require("../utils/TypeUtils").inferElementType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
class DictLiteral extends Literal {

    constructor(mutable, entries) {
        super("<:>", new DictionaryValue(MissingType.instance, new Dictionary(), mutable));
        this.mutable = mutable;
        this.entries = entries || new DictEntryList();
        this.itemType = null;
    }

    toDialect(writer) {
        if(this.mutable)
            writer.append("mutable ");
        this.entries.toDialect(writer);
    }

    declare(transpiler) {
        transpiler.require(Dictionary);
        this.entries.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new Dictionary(").append(this.mutable).append(", ");
        this.entries.transpile(transpiler);
        transpiler.append(")");
    }

    check(context) {
        if(this.itemType==null)
            this.itemType = this.inferElementType(context);
        return new DictionaryType(this.itemType);
    }

    inferElementType(context) {
        var items = this.entries.items;
        if(items.length==0) {
            return MissingType.instance;
        }
        var types = [];
        items.forEach(function(entry) {
            var elemType = entry.value.check(context);
            types.push(elemType);
        });
        return inferElementType(context, types);
    }

    interpret(context) {
        if(this.entries.items.length>0) {
            this.check(context); /// force computation of itemType
            var dict = new Dictionary();
            this.entries.items.forEach(function(entry) {
                var key = entry.key.interpret(context);
                var val = entry.value.interpret(context);
                val = this.interpretPromotion(val);
                dict[key] = val;
            }, this);
            return new DictionaryValue(this.itemType, dict, this.mutable);
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
}

exports.DictLiteral = DictLiteral;
