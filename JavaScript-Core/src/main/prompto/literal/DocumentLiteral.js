var Literal = require("./Literal").Literal;
var Document = require("../intrinsic/Document").Document;
var DocEntryList = require("./DocEntryList").DocEntryList;
var DocumentValue = require("../value/DocumentValue").DocumentValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var DocumentType = require("../type/DocumentType").DocumentType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;


// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
function DocumentLiteral(entries) {
    this.entries = entries || new DocEntryList();
    Literal.call(this, "{}", new DocumentValue(new Document()));
    return this;
}

DocumentLiteral.prototype = Object.create(Literal.prototype);
DocumentLiteral.prototype.constructor = DocumentLiteral;

DocumentLiteral.prototype.toDialect = function(writer) {
    this.entries.toDialect(writer);
};

DocumentLiteral.prototype.declare = function(transpiler) {
    transpiler.require(Document);
    this.entries.declare(transpiler);
};


DocumentLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("new Document(");
    this.entries.transpile(transpiler);
    transpiler.append(")");
};


DocumentLiteral.prototype.check = function(context) {
    return DocumentType.instance;
};

DocumentLiteral.prototype.interpret = function(context) {
    if(this.entries.items.length>0) {
        this.check(context); /// force computation of itemType
        var doc = new Document();
        this.entries.items.forEach(function(entry) {
            var key = entry.key.interpret(context);
            var val = entry.value.interpret(context);
            val = this.interpretPromotion(val);
            doc[key] = val;
        }, this);
        return new DocumentValue(doc);
    } else
        return this.value;
};


DocumentLiteral.prototype.interpretPromotion = function(item) {
    if (item == null)
        return item;
    if (DecimalType.instance == this.itemType && item.type == IntegerType.instance)
        return new DecimalValue(item.DecimalValue());
    else if (TextType.instance == this.itemType && item.type == CharacterType.instance)
        return new TextValue(item.value);
    else
        return item;
};

exports.DocumentLiteral = DocumentLiteral;
