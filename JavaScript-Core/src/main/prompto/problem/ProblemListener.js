import ProblemCollector from './ProblemCollector'
import { SyntaxError } from "../error/index"

export default class ProblemListener extends ProblemCollector {
   
    collectProblem(problem) {
        if(problem.type == "error")
            throw new SyntaxError(problem.message);
    }
}
