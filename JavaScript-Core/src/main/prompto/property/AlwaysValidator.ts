import PropertyValidator from './PropertyValidator'
import {AnyType, IType} from '../type'
import {Context} from "../runtime";
import {JsxProperty} from "../jsx";

export default class AlwaysValidator extends PropertyValidator {

    static instance = new AlwaysValidator();

    getType(context: Context): IType {
        return AnyType.instance;
    }

    validate(context: Context, jsxProp: JsxProperty) {
        // accept any property
        return true;
    }
}
