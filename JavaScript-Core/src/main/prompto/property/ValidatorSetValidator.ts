import PropertyValidator from "./PropertyValidator";
import { AnyType } from "../type";
import { ProblemCollector } from "../problem";
import {Context} from "../runtime";
import {JsxProperty} from "../jsx";

export default class ValidatorSetValidator extends PropertyValidator {

    validators: PropertyValidator[];

    constructor(validators: PropertyValidator[]) {
        super();
        this.validators = validators;
    }

    getType(context: Context) {
        return AnyType.instance;
    }

    validate(context: Context, jsxProp: JsxProperty) {
        let valid = false;
        context.pushProblemListener(new ProblemCollector());
        try {
            valid = this.validators.some(v => v.validate(context, jsxProp));
        } finally {
            context.popProblemListener();
        }
        if(valid)
            return true;
        else {
            const message = "Illegal value " + jsxProp.value + ", expected one of <" + this.validators.join(", ") + ">";
            context.problemListener.reportIllegalValue(jsxProp, message);
            return false;
        }
    }
}
