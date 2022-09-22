import PropertyValidator from "./PropertyValidator.js";
import { AnyType } from "../type";
import { ProblemCollector } from "../problem";

export default class ValidatorSetValidator extends PropertyValidator {

    constructor(validators) {
        super();
        this.validators = validators;
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, jsxProp) {
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
