var ProblemCollector = require('./ProblemCollector').ProblemCollector;
var SyntaxError = require("../error/SyntaxError").SyntaxError;

function ProblemListener() {
    ProblemCollector.call(this);
    return this;
}

ProblemListener.prototype = Object.create(ProblemCollector.prototype);
ProblemListener.prototype.constructor = ProblemListener;

ProblemListener.prototype.readSection = function(section) {
    return {}; // avoid NPE
};

ProblemListener.prototype.collectProblem = function(problem) {
    if(problem.type == "error")
        throw new SyntaxError(problem.message);
};


exports.ProblemListener = ProblemListener;