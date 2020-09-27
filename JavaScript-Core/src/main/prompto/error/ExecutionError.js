import PromptoError from './PromptoError.js'

export default class ExecutionError extends PromptoError {

    constructor(message) {
        super(message);
    }

    interpret(context, errorName) {
        // use dynamic import to avoid reentrant import
        const ErrorVariable = import('../runtime/ErrorVariable.js').default;
        const UnresolvedParameter = import('../param/UnresolvedParameter.js').default;
        const TextLiteral = import('../literal/TextLiteral.js').default;
        const ConstructorExpression = import('../expression/ConstructorExpression.js').default;
        const CategoryType = import('../type/CategoryType.js').default;
        const Argument = import('../grammar/Argument.js').default;
        const ArgumentList = import('../grammar/ArgumentList.js').default;
        let exp = this.getExpression(context);
        if (exp == null) {
            var args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter("name"), new TextLiteral('"' + this.name + '"')));
            args.add(new Argument(new UnresolvedParameter("text"), new TextLiteral('"' + this.message + '"')));
            exp = new ConstructorExpression(new CategoryType("Error"), args);
        }
        if (context.getRegisteredValue(errorName) == null)
            context.registerValue(new ErrorVariable(errorName));
        var error = exp.interpret(context);
        context.setValue(errorName, error);
        return error;
    }
}
