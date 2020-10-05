import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { CategoryParameter } from '../param/index.js'
import { TextType } from '../type/index.js'
import { TextValue } from '../value/index.js'
import { Identifier } from '../grammar/index.js'


// don't use export default since more builtins are expected
class FormatMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("format", new CategoryParameter(TextType.instance, new Identifier("format")));
    }

    interpret(context) {
        let value = this.getValue(context).getStorableData();
        const format = context.getValue(new Identifier("format")).getStorableData();
        value = this.format(value, format);
        return new TextValue(value);
    }

    check(context) {
        return TextType.instance;
    }

    format(value, format) {
        // TODO support more than leading 0's
        value = "000000000000" + value;
        return value.substr(value.length - format.length);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("formatInteger(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

export {FormatMethodDeclaration};