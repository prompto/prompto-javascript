import PromptoError from './PromptoError'

export default class SyntaxError extends PromptoError {

	constructor(message: string) {
		super(message);
	}

}
