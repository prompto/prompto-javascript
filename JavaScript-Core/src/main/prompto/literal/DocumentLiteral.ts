import Literal from './Literal'
import { DocEntryList } from './index'
import {DocumentValue, DecimalValue, TextValue, IValue, IntegerValue, CharacterValue} from '../value'
import { Document } from '../intrinsic'
import {DocumentType, DecimalType, TextType, IType} from '../type'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DocumentLiteral extends Literal<DocumentValue> {

    entries: DocEntryList;
    itemType?: IType;

    constructor(entries: DocEntryList | null) {
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

    check(context: Context): IType {
        this.entries.check(context);
        return DocumentType.instance;
    }

    interpret(context: Context): IValue {
        if(this.entries.length>0) {
            this.check(context); /// force computation of itemType
            const doc = new Document<TextValue, IValue>();
            this.entries.forEach(entry => {
                const key = entry.key.interpret(context);
                let val = entry.value.interpret(context);
                val = this.interpretPromotion(val);
                doc.$safe_setMember(key, val);
            }, this);
            return new DocumentValue(doc);
        } else
            return this.value;
    }

    interpretPromotion(item: IValue): IValue {
        if (DecimalType.instance == this.itemType && item instanceof IntegerValue)
            return new DecimalValue(item.DecimalValue());
        else if (TextType.instance == this.itemType && item instanceof CharacterValue)
            return new TextValue(item.value);
        else
            return item;
    }
}
