import Literal from './Literal'
import { DictEntryList } from './index'
import {DictionaryValue, DecimalValue, TextValue, IValue, IntegerValue, CharacterValue} from '../value'
import {MissingType, DecimalType, TextType, DictionaryType, TypeMap, IType} from '../type'
import { Dictionary } from '../intrinsic'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

// we can only compute keys by evaluating key expressions in context
// so we need to keep the full entry list.
export default class DictLiteral extends Literal<DictionaryValue> {

    mutable: boolean;
    entries: DictEntryList;
    itemType?: IType;

    constructor(mutable: boolean, entries: DictEntryList | null) {
        super("<:>", new DictionaryValue(MissingType.instance, new Dictionary(), mutable));
        this.mutable = mutable;
        this.entries = entries || new DictEntryList();
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
        transpiler.append("new Dictionary(").appendBoolean(this.mutable).append(", ");
        this.entries.transpile(transpiler);
        transpiler.append(")");
    }

    check(context: Context): IType {
        if(!this.itemType)
            this.itemType = this.inferElementType(context);
        return new DictionaryType(this.itemType);
    }

    inferElementType(context: Context) {
        if(this.entries.length == 0)
            return MissingType.instance;
        const types = new TypeMap();
        this.entries.forEach(entry => {
            const elemType = entry.value.check(context);
            types.add(elemType);
        });
        return types.inferType(context, this);
    }

    interpret(context: Context): IValue {
        if(this.entries.length>0) {
            this.check(context); /// force computation of itemType
            const dict = new Dictionary();
            this.entries.forEach(entry => {
                const key = entry.key.interpret(context);
                let val = entry.value.interpret(context);
                val = this.interpretPromotion(val);
                dict[key] = val;
            }, this);
            return new DictionaryValue(this.itemType, dict, this.mutable);
        } else
            return this.value;
    }

    interpretPromotion(item: IValue): IValue {
        if (item == null)
            return item;
        if (DecimalType.instance == this.itemType && item instanceof IntegerValue)
            return new DecimalValue(item.DecimalValue());
        else if (TextType.instance == this.itemType && item instanceof CharacterValue)
            return new TextValue(item.value);
        else
            return item;
    }
}
