import Literal from './Literal'
import { ExpressionList } from '../expression'
import {SetValue, DecimalValue, TextValue, IValue, IntegerValue, CharacterValue} from '../value'
import {SetType, DecimalType, MissingType, TextType, IType} from '../type'
import {CodeWriter, inferExpressionsType} from '../utils'
import StrictSet from "../intrinsic/StrictSet.js"
import {Context, Transpiler} from "../runtime";

export default class SetLiteral extends Literal<SetValue> {

    expressions: ExpressionList;
    itemType?: IType;
    type?: IType;

    constructor(expressions?: ExpressionList | null) {
        expressions = expressions || new ExpressionList();
        super("<" + expressions.toString() + ">", new SetValue(MissingType.instance));
        this.expressions = expressions;
    }

    check(context: Context): IType {
        if(!this.itemType) {
            this.itemType = inferExpressionsType(context, this.expressions);
            delete this.type;
        }
        if(!this.type)
            this.type = new SetType(this.itemType);
        return this.type!;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(StrictSet);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new StrictSet([");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context: Context): SetValue {
        this.check(context); // force computation of itemType
        const items = this.expressions.map(expression => this.interpretPromotion(expression.interpret(context)), this);
        return new SetValue(this.itemType!, items);
    }

    interpretPromotion(item: IValue) {
        if (item == null)
            return item;
        if (DecimalType.instance == this.itemType && item instanceof IntegerValue)
            return new DecimalValue(item.DecimalValue());
        else if (TextType.instance == this.itemType && item instanceof CharacterValue)
            return new TextValue(item.value);
        else
            return item;
    }

    toDialect(writer: CodeWriter): void {
        if(this.expressions!=null) {
            writer.append('<');
            this.expressions.toDialect(writer);
            writer.append('>');
        } else
            writer.append("< >");
    }
}

