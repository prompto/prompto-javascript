import Literal from "./Literal"
import { DocEntryList } from "./index"
import { DocumentValue, DecimalValue, TextValue } from "../value/index"
import { Document } from "../intrinsic/index"
import { DocumentType, DecimalType, IntegerType, TextType, CharacterType } from "../type/index"

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DocumentLiteral extends Literal {

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
