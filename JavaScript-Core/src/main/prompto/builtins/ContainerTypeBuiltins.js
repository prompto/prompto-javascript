import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { CategoryParameter } from '../param/index.js'
import { TextType } from '../type/index.js'
import { TextValue } from '../value/index.js'
import { Identifier } from '../grammar/index.js'
import { TextLiteral } from '../literal/index.js'

// don't use export default since more builtins are expected
class BaseJoinMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("join", new CategoryParameter(TextType.instance, new Identifier("delimiter"), new TextLiteral('","')) );
    }

    interpret(context) {
        const items = this.getItems(context);
        const texts = items.map(value => value.toString());
        const delimiter = context.getValue(new Identifier("delimiter")).getStorableData();
        const joined = texts.join(delimiter);
        return new TextValue(joined);
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("join(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

class JoinListMethodDeclaration extends BaseJoinMethodDeclaration {

    constructor() {
        super();
    }

    getItems(context) {
        return this.getValue(context).items;
    }
}

class JoinSetMethodDeclaration extends BaseJoinMethodDeclaration {

    constructor() {
        super();
    }

    getItems(context) {
        return Array.from(this.getValue(context).items.set);
    }
}

class JoinTupleMethodDeclaration extends BaseJoinMethodDeclaration {

    constructor() {
        super();
    }

    getItems(context) {
        return this.getValue(context).items;
    }
}


export {JoinListMethodDeclaration, JoinSetMethodDeclaration, JoinTupleMethodDeclaration};