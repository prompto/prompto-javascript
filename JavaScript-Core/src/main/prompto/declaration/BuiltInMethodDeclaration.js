import BaseMethodDeclaration from "./BaseMethodDeclaration"
import { ParameterList } from "../param/index"
import { BuiltInContext } from "../runtime/index"
import { InternalError } from "../error/index"

export default class BuiltInMethodDeclaration extends BaseMethodDeclaration {

    constructor(name) {
        let args = null;
        if ( arguments.length > 1 ) {
            args = new ParameterList();
            for(let i = 1;i<arguments.length; i++) {
                args.add(arguments[i]);
            }
        }
        super(name, args);
    }

    getValue(context) {
        while (context) {
            if (context instanceof BuiltInContext)
                return context.value;
            context = context.getParentContext();
        }
        throw new InternalError("Could not locate context for built-in value!");
    }

    transpileCall(transpiler, assignments) {
        throw new Error("Need to override transpileCall in " + this.constructor.name);
    }
}
