import ProblemListener from "./ProblemListener.ts";

// can't use a class for Problem because it must remain serializable
// so can't have a Problem.toString() function
// use a global function instead

function problemToString(problem) {
    return "{ type: " + problem.type
        + ", startLine: " + problem.startLine + ", startColumn: " + problem.startColumn
        + ", endLine: " + problem.endLine + ", endColumn: " + problem.endColumn
        + ", message: " + problem.message + " }";
}

export default class ProblemCollector extends ProblemListener {
   
    constructor() {
        super();
        this.problems = [];
        this.unique = new Set();
    }

    collectProblem(problem) {
        const s = problemToString(problem);
        if(!this.unique.has(s)) {
            this.unique.add(s);
            this.problems.push(problem);
        }
    }

}
