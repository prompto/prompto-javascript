var ProblemCollector = require('./ProblemCollector').ProblemCollector;
var SyntaxError = require("../error/SyntaxError").SyntaxError;

class ProblemListener extends ProblemCollector {
   
    constructor() {
        super();
    }

    collectProblem(problem) {
        if(problem.type == "error")
            throw new SyntaxError(problem.message);
    }
}


exports.ProblemListener = ProblemListener;