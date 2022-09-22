import Literal from '../../../main/prompto/literal/Literal.ts'
import { DocEntryList } from './index.ts'
import { DocumentValue, DecimalValue, TextValue } from '../value'
import { Document } from '../intrinsic'
import { DocumentType, DecimalType, IntegerType, TextType, CharacterType } from '../type'

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DocumentLiteral extends Literal {

    constructor(entries) {
        super("{}", new DocumentValue(new Document()));
        this.entries = entries || new DocEntryList();
    }

    toDialect(writer: CodeWriter): void {
        this.entries.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Document);
        this.entries.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new Document(");
        this.entries.transpile(transpiler);
        transpiler.append(")");
    }

    check(context: Context): Type {
        this.entries.check(context);
        return DocumentType.instance;
    }

    interpret(context: Context): Value {
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
