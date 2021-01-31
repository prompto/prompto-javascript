import ProblemListener from './ProblemListener.js'
import { SyntaxError } from '../error/index.js'

export default class ProblemRaiser extends ProblemListener {
   
    collectProblem(problem) {
        if(problem.type === "error")
            throw new SyntaxError(problem.message);
    }
}
