import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import { CategoryParameter } from '../param'
import {TextType, IType} from '../type'
import {IntegerValue, TextValue, IValue} from '../value'
import {ArgumentList, Identifier} from '../grammar'
import {Context, Transpiler} from "../runtime";

export class FormatMethodDeclaration extends BuiltInMethodDeclaration<IntegerValue> {

    constructor() {
        super("format", new CategoryParameter(TextType.instance, new Identifier("format")));
    }

    interpret(context: Context): IValue {
        const intValue = this.getValue(context);
        const intData = intValue.getStorableData();
        const formatValue = context.getValue(new Identifier("format")) as TextValue;
        const formatData = formatValue.getStorableData();
        const value = this.format(intData, formatData);
        return new TextValue(value);
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    format(value: number, format: string): string {
        // TODO support more than leading 0's
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const result = "000000000000" + value;
        return result.substring(result.length - format.length);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("formatInteger(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}

