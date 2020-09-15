import PropertyValidator from './PropertyValidator.js'
import { AnyType } from '../type/index.js'

export default class AlwaysValidator extends PropertyValidator {

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
        // accept any property
    }
}

AlwaysValidator.instance = new AlwaysValidator();
