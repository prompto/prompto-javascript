import ContainerLiteral from "./ContainerLiteral";
import {ListType, MissingType, TextType, DecimalType, IType} from '../type'
import {ListValue, TextValue, DecimalValue, IValue, IntegerValue, CharacterValue} from '../value'
import { List } from '../intrinsic'
import { ExpressionList } from '../expression'
import {CodeWriter, inferExpressionsType} from '../utils'
import {Context, Transpiler} from "../runtime";

export default class ListLiteral extends ContainerLiteral<ListValue> {

    type?: IType;

    constructor(mutable: boolean, expressions: ExpressionList | null) {
        expressions = expressions || new ExpressionList();
        super("[" + expressions.toString() + "]", new ListValue(MissingType.instance, mutable));
        this.mutable = mutable;
        this.expressions = expressions;
    }

    check(context: Context): IType {
        if(!this.itemType) {
            this.itemType = inferExpressionsType(context, this, this.expressions);
            delete this.type;
        }
        if(!this.type)
            this.type = new ListType(this.itemType, this.mutable);
        return this.type!;
    }

    interpretExpression(context: Context): IValue {
        if(this.expressions.length) {
            this.check(context); // force computation of itemType
            const items = this.expressions.map(expression => this.interpretPromotion(expression.interpretExpression(context)), this);
            return new ListValue(this.itemType!, this.mutable, items);
        } else
            return this.value;
    }

    interpretPromotion(item: IValue) {
        if (DecimalType.instance == this.itemType && item instanceof IntegerValue)
            return new DecimalValue(item.DecimalValue());
        else if (TextType.instance == this.itemType && item instanceof CharacterValue)
            return new TextValue(item.value);
        else
            return item;
    }

    toDialect(writer: CodeWriter): void {
        if(this.mutable)
            writer.append("mutable ");
        if(this.expressions!=null) {
            writer.append('[');
            this.expressions.toDialect(writer);
            writer.append(']');
        } else
            writer.append("[]");
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(List);
        if(this.expressions!=null)
            this.expressions.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new List(").appendBoolean(this.mutable).append(", [");
        if(this.expressions!=null) {
            this.expressions.transpile(transpiler);
            transpiler.append('])');
        } else
            transpiler.append("])");
    }
}


