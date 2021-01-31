import ProblemListener from "./ProblemListener.js";

export default class ProblemCollector extends ProblemListener {
   
    constructor() {
        super();
        this.problems = [];
    }

    collectProblem(problem) {
        this.problems.push(problem);
    }

}
