import ProblemListener from './ProblemListener';
import IProblem from "../problem/IProblem";
export default class ProblemRaiser extends ProblemListener {
    collectProblem(problem: IProblem): void;
}
