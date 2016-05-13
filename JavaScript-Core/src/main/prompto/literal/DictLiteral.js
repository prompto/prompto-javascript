var Literal = require("./Literal").Literal;
var DictEntryList = require("./DictEntryList").DictEntryList;
var Dictionary = require("../value/Dictionary").Dictionary;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var MissingType = require("../type/MissingType").MissingType;
var DictType = require("../type/DictType").DictType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
function DictLiteral(mutable, entries) {
    if(typeof(mutable)!=typeof(true))
        throw "mutable!";
    this.mutable = mutable;
	this.entries = entries || new DictEntryList();
    this.itemType = null;
	Literal.call(this, this.entries.toString(), new Dictionary(MissingType.instance));
	return this;
}

DictLiteral.prototype = Object.create(Literal.prototype);
DictLiteral.prototype.constructor = DictLiteral;

DictLiteral.prototype.toDialect = function(writer) {
    if(this.mutable)
        writer.append("mutable ");
    this.entries.toDialect(writer);
};

DictLiteral.prototype.check = function(context) {
	if(this.itemType==null)
        this.itemType = this.inferElementType(context);
	return new DictType(this.itemType);
};

DictLiteral.prototype.inferElementType = function(context) {
	var items = this.entries.items;
	if(items.length==0) {
		return MissingType.instance;
	}
	var lastType = null;
	items.forEach(function(entry) {
        var keyType = entry.key.check(context);
		if(keyType!=TextType.instance) {
			throw new SyntaxError("Illegal key type: " + keyType.toString());
		}
		var elemType = entry.value.check(context);
		if(lastType==null) {
			lastType = elemType;
		} else if(!lastType.equals(elemType)) {
			if(elemType.isAssignableTo(context, lastType)) {
				; // lastType is less specific
			} else if(lastType.isAssignableTo(context, elemType)) {
				lastType = elemType; // elemType is less specific
			} else {
				throw new SyntaxError("Incompatible value types: " + elemType.toString() + " and " + lastType.toString());
			}
		}
	});
	return lastType;
};

DictLiteral.prototype.interpret = function(context) {
	if(this.entries.items.length>0) {
        var self = this;
        this.check(context); /// force computation of itemType
        var dict = {};
        this.entries.items.forEach(function(entry) {
            var key = entry.key.interpret(context);
            var val = entry.value.interpret(context);
            val = self.interpretPromotion(val);
            dict[key] = val;
        });
        return new Dictionary(this.itemType, dict, this.mutable);
    } else
	    return this.value;
};


DictLiteral.prototype.interpretPromotion = function(item) {
    if (item == null)
        return item;
    if (DecimalType.instance == this.itemType && item.type == IntegerType.instance)
        return new Decimal(item.DecimalValue());
    else if (TextType.instance == this.itemType && item.type == CharacterType.instance)
        return new Text(item.value);
    else
        return item;
};

exports.DictLiteral = DictLiteral;
