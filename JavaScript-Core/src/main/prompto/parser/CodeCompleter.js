var ProblemListener = require('./ProblemListener').ProblemListener;

function CodeCompleter() {
    ProblemListener.call(this);
    this.suggestions = [];
    return this;
}

CodeCompleter.prototype = Object.create(ProblemListener.prototype);
CodeCompleter.prototype.constructor = CodeCompleter;

CodeCompleter.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    var self = this;
    var parser = recognizer._ctx.parser;
    e.deadEndConfigs.configs.map(function(cfg) {
        var intervals = cfg.state.atn.getExpectedTokens(cfg.state.stateNumber, e.ctx);
        intervals.intervals.map(function(interval) {
            for(var t=interval.start;t<interval.stop;t++) {
                var literal = parser.literalNames[t];
                if(literal)
                    literal = literal.substring(1, literal.length-1);
                var suggestion = { type : t, symbol : parser.symbolicNames[t], literal : literal };
                self.suggestions.push(suggestion);
            }
        });
    });
};

CodeCompleter.prototype.hasSuggestion = function(s) {
    return this.suggestions.map(function(s) { return s.literal; }).indexOf(s)>=0;
};

exports.CodeCompleter = CodeCompleter;