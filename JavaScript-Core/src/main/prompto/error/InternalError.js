import PromptoError from './PromptoError.ts'

export default class InternalError extends PromptoError {

	constructor(message) {
		super(message);
	}

}
