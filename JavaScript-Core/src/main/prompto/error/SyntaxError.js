import PromptoError from './PromptoError.js'

export default class SyntaxError extends PromptoError {

	constructor(message) {
		super(message);
	}

}