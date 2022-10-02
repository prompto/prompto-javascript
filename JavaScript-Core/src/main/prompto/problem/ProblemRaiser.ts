import ProblemListener from './ProblemListener'
import {SyntaxError} from '../error'
import IProblem from "../problem/IProblem";
import ProblemType from "./ProblemType";

export default class ProblemRaiser extends ProblemListener {
   
    collectProblem(problem: IProblem): void {
        if(problem.type == ProblemType.ERROR)
            throw new SyntaxError(problem.message);
    }
}
