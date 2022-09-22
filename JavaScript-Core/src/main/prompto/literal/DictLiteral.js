import Literal from './Literal.ts'
import { DictEntryList } from './index.ts'
import { DictionaryValue, DecimalValue, TextValue } from '../value'
import { MissingType, DecimalType, IntegerType, TextType, CharacterType, DictionaryType, TypeMap } from '../type'
import { Dictionary } from '../intrinsic'

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DictLiteral extends Literal {

    constructor(mutable, entries) {
        super("<:>", new DictionaryValue(MissingType.instance, new Dictionary(), mutable));
        this.mutable = mutable;
        this.entries = entries || new DictEntryList();
        this.itemType = null;
    }

    toDialect(writer: CodeWriter): void {
        if(this.mutable)
            writer.append("mutable ");
        this.entries.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Dictionary);
        this.entries.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new Dictionary(").append(this.mutable).append(", ");
        this.entries.transpile(transpiler);
        transpiler.append(")");
    }

    check(context: Context): Type {
        if(this.itemType==null)
            this.itemType = this.inferElementType(context);
        return new DictionaryType(this.itemType);
    }

    inferElementType(context) {
        if(this.entries.items.length === 0)
            return MissingType.instance;
        const types = new TypeMap();
        this.entries.items.forEach(entry => {
            const elemType = entry.value.check(context);
            types.add(elemType);
        });
        return types.inferType(context, this);
    }

    interpret(context: Context): Value {
        if(this.entries.items.length>0) {
            this.check(context); /// force computation of itemType
            const dict = new Dictionary();
            this.entries.items.forEach(function(entry) {
                const key = entry.key.interpret(context);
                let val = entry.value.interpret(context);
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
