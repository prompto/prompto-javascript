import ProblemCollector from './ProblemCollector.js'
import { SyntaxError } from '../error/index.js'

export default class ProblemListener extends ProblemCollector {
   
    collectProblem(problem) {
        if(problem.type == "error")
            throw new SyntaxError(problem.message);
    }
}
