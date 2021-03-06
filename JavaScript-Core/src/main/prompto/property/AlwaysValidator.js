import PropertyValidator from './PropertyValidator.js'
import { AnyType } from '../type/index.js'

export default class AlwaysValidator extends PropertyValidator {

    getType(context) {
        return AnyType.instance;
    }

    validate(context, jsxProp) {
        // accept any property
        return true;
    }
}

AlwaysValidator.instance = new AlwaysValidator();
