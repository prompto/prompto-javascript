
export default class AlwaysValidator extends PropertyValidator {

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
        // accept any property
    }
}


AlwaysValidator.instance = new AlwaysValidator();
