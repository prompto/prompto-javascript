import ProblemListener from './ProblemListener'
import {SyntaxError} from '../error'
import Problem from "./Problem";
import ProblemType from "./ProblemType";

export default class ProblemRaiser extends ProblemListener {
   
    collectProblem(problem: Problem): void {
        if(problem.type == ProblemType.ERROR)
            throw new SyntaxError(problem.message);
    }
}
