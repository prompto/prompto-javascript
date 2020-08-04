var ProblemListener = require('./ProblemListener').ProblemListener;

class CodeCompleter extends ProblemListener {
    constructor() {
        super();
        this.suggestions = [];
        return this;
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        var self = this;
        var parser = recognizer._ctx.parser;
        e.deadEndConfigs.configs.forEach(function(cfg) {
            var intervals = cfg.state.atn.getExpectedTokens(cfg.state.stateNumber, e.ctx);
            intervals.intervals.forEach(function(interval) {
                for(var t=interval.start;t<interval.stop;t++) {
                    var literal = parser.literalNames[t];
                    if(literal)
                        literal = literal.substring(1, literal.length-1);
                    var suggestion = { type : t, symbol : parser.symbolicNames[t], literal : literal };
                    self.suggestions.push(suggestion);
                }
            });
        });
    }

    hasSuggestion(s) {
        return this.suggestions.map(function(s) { return s.literal; }).indexOf(s)>=0;
    }
}

exports.CodeCompleter = CodeCompleter;