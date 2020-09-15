import Literal from './Literal.js'
import { DictEntryList } from './index.js'
import { DictionaryValue, DecimalValue, TextValue } from '../value/index.js'
import { MissingType, DecimalType, IntegerType, TextType, CharacterType, DictionaryType } from '../type/index.js'
import { inferElementType } from '../utils/index.js'
import { Dictionary } from '../intrinsic/index.js'

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DictLiteral extends Literal {

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
        const items = this.entries.items;
        if(items.length==0) {
            return MissingType.instance;
        }
        const types = [];
        items.forEach(entry => {
            const elemType = entry.value.check(context);
            types.push(elemType);
        });
        return inferElementType(context, types);
    }

    interpret(context) {
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
