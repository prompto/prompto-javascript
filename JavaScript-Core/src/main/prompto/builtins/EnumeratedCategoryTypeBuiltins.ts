import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import { CategoryParameter } from '../param'
import {TextType, IType} from '../type'
import {ArgumentList, Identifier} from '../grammar'
import { EnumeratedCategoryDeclaration } from '../declaration'
import { SyntaxError } from '../error'
import {Context, Transpiler} from "../runtime";
import {TextValue, IValue} from "../value";

export class SymbolOfMethodDeclaration extends BuiltInMethodDeclaration<IValue> {

    enumType: IType;

    constructor(enumType: IType) {
        super( "symbolOf", new CategoryParameter(TextType.instance, new Identifier("name")));
        this.enumType = enumType;
    }

    check(context: Context): IType {
        return this.enumType;
    }

    interpret(context: Context): IValue {
        const decl = context.getRegisteredDeclaration<EnumeratedCategoryDeclaration>(EnumeratedCategoryDeclaration, this.enumType.id);
        if(decl instanceof EnumeratedCategoryDeclaration) {
            const value = context.getValue(new Identifier("name")) as TextValue;
            const name = value.getStorableData();
            return decl.getSymbolByName(name);
        } else
            throw new SyntaxError(this.enumType.name + " is not an enumerated type!");
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("symbolOf(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}


