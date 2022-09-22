import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import { CategoryParameter } from '../param'
import {TextType, Type} from '../type'
import {Container, ListValue, SetValue, TextValue, TupleValue, Value} from '../value'
import {ArgumentList, Identifier} from '../grammar'
import { TextLiteral } from '../literal'
import {Context, Transpiler} from "../runtime";

abstract class BaseJoinMethodDeclaration<T extends Value> extends BuiltInMethodDeclaration<T> {

    constructor() {
        super("join", new CategoryParameter(TextType.instance, new Identifier("delimiter"), new TextLiteral('","')) );
    }

    interpret(context: Context): Value {
        const value = context.getValue(new Identifier("delimiter")) as TextValue;
        const delimiter = value.getStorableData() as string;
        const joined = this.getItems(context)
                .map(value => value.toString())
                .join(delimiter);
        return new TextValue(joined);
    }

    check(context: Context): Type {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("join(");
        args[0].transpile(transpiler, this);
        transpiler.append(")");
    }

    getItems(context: Context): Array<Value> {
        const value = this.getValue(context) as unknown as Container<Iterable<Value>>;
        return value.items;
    }
}

export class JoinListMethodDeclaration extends BaseJoinMethodDeclaration<ListValue> {
}

export class JoinSetMethodDeclaration extends BaseJoinMethodDeclaration<SetValue> {
}

export class JoinTupleMethodDeclaration extends BaseJoinMethodDeclaration<TupleValue> {
}


