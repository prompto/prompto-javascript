const Literal = require("./Literal").Literal;
const Document = require("../intrinsic/Document").Document;
const DocEntryList = require("./DocEntryList").DocEntryList;
const DocumentValue = require("../value/DocumentValue").DocumentValue;
const IntegerType = require("../type/IntegerType").IntegerType;
const DecimalType = require("../type/DecimalType").DecimalType;
const DocumentType = require("../type/DocumentType").DocumentType;
const CharacterType = require("../type/CharacterType").CharacterType;
const TextType = require("../type/TextType").TextType;
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const TextValue = require("../value/TextValue").TextValue;


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
            const doc = new Document();
            this.entries.items.forEach(function(entry) {
                const key = entry.key.interpret(context);
                let val = entry.value.interpret(context);
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
