
export default class CodeParameter extends Parameter {

    constructor(id) {
        super(id);
    }

    getProto() {
        return CodeType.instance.name;
    }

    register(context) {
        const actual = context.getRegisteredValue(this.name);
        if(actual!=null) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        context.registerValue(this);
    }

    check(context) {
        // nothing to do
    }

    declare(transpiler) {
        // nothing to do
    }

    getType(context) {
        return CodeType.instance;
    }

    toDialect(writer) {
        writer.append(CodeType.instance.name);
        writer.append(" ");
        writer.append(this.name);
    }
}
