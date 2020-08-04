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
class DocumentLiteral extends Literal {

    constructor(entries) {
        super("{}", new DocumentValue(new Document()));
        this.entries = entries || new DocEntryList();
    }

    toDialect(writer) {
        this.entries.toDialect(writer);
    }

    declare(transpiler) {
        transpiler.require(Document);
        this.entries.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new Document(");
        this.entries.transpile(transpiler);
        transpiler.append(")");
    }

    check(context) {
        return DocumentType.instance;
    }

    interpret(context) {
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

exports.DocumentLiteral = DocumentLiteral;
