import ProblemListener from "./ProblemListener";
import IProblem from "./IProblem";
import ProblemType from "./ProblemType";

// can't use a class for Problem because it must remain serializable
// so can't have a Problem.toString() function
// use a global function instead

function problemToString(problem: IProblem) {
    return "{ type: " + ProblemType[problem.type]
        + ", startLine: " + String(problem.startLine) + ", startColumn: " + String(problem.startColumn)
        + ", endLine: " + String(problem.endLine) + ", endColumn: " + String(problem.endColumn)
        + ", message: " + problem.message + " }";
}

export default class ProblemCollector extends ProblemListener {

    unique = new Set<string>();

    collectProblem(problem: IProblem) {
        const s = problemToString(problem);
        if(!this.unique.has(s)) {
            this.unique.add(s);
            this.problems.push(problem);
        }
    }

}
