import ProblemListener from './ProblemListener.ts'

export default class CodeCompleter extends ProblemListener {

    constructor() {
        super();
        this.suggestions = [];
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        const self = this;
        const parser = recognizer._ctx.parser;
        e.deadEndConfigs.configs.forEach(cfg => {
            const intervals = cfg.state.atn.getExpectedTokens(cfg.state.stateNumber, e.ctx);
            intervals.intervals.forEach(interval => {
                for(let t=interval.start;t<interval.stop;t++) {
                    let literal = parser.literalNames[t];
                    if(literal)
                        literal = literal.substring(1, literal.length-1);
                    const suggestion = { type : t, symbol : parser.symbolicNames[t], literal : literal };
                    self.suggestions.push(suggestion);
                }
            });
        });
    }

    hasSuggestion(s) {
        return this.suggestions.map(s => s.literal).indexOf(s)>=0;
    }
}
