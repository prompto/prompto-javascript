import ProblemListener from "./ProblemListener";
import IProblem from "./IProblem";
export default class ProblemCollector extends ProblemListener {
    unique: Set<string>;
    collectProblem(problem: IProblem): void;
}
