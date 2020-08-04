// Generated from ArgsLexer.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u00070\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002\u0013\n\u0002",
    "\f\u0002\u000e\u0002\u0016\u000b\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003\"\n\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0007\u0006\u0007-\n\u0007\r\u0007\u000e\u0007.\u0002\u0002\b\u0003",
    "\u0003\u0005\u0002\u0007\u0004\t\u0005\u000b\u0006\r\u0007\u0003\u0002",
    "\u0005\u0006\u0002\f\f\u000f\u000f$$^^\n\u0002$$))^^ddhhppttvv\b\u0002",
    "\u000b\f\u000f\u000f\"\"$$//??\u00024\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002",
    "\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002",
    "\u0002\u0003\u000f\u0003\u0002\u0002\u0002\u0005\u0019\u0003\u0002\u0002",
    "\u0002\u0007#\u0003\u0002\u0002\u0002\t%\u0003\u0002\u0002\u0002\u000b",
    "\'\u0003\u0002\u0002\u0002\r,\u0003\u0002\u0002\u0002\u000f\u0014\u0007",
    "$\u0002\u0002\u0010\u0013\u0005\u0005\u0003\u0002\u0011\u0013\n\u0002",
    "\u0002\u0002\u0012\u0010\u0003\u0002\u0002\u0002\u0012\u0011\u0003\u0002",
    "\u0002\u0002\u0013\u0016\u0003\u0002\u0002\u0002\u0014\u0012\u0003\u0002",
    "\u0002\u0002\u0014\u0015\u0003\u0002\u0002\u0002\u0015\u0017\u0003\u0002",
    "\u0002\u0002\u0016\u0014\u0003\u0002\u0002\u0002\u0017\u0018\u0007$",
    "\u0002\u0002\u0018\u0004\u0003\u0002\u0002\u0002\u0019!\u0007^\u0002",
    "\u0002\u001a\"\t\u0003\u0002\u0002\u001b\u001c\u000425\u0002\u001c\u001d",
    "\u000429\u0002\u001d\"\u000429\u0002\u001e\u001f\u000429\u0002\u001f",
    "\"\u000429\u0002 \"\u000429\u0002!\u001a\u0003\u0002\u0002\u0002!\u001b",
    "\u0003\u0002\u0002\u0002!\u001e\u0003\u0002\u0002\u0002! \u0003\u0002",
    "\u0002\u0002\"\u0006\u0003\u0002\u0002\u0002#$\u0007?\u0002\u0002$\b",
    "\u0003\u0002\u0002\u0002%&\u0007/\u0002\u0002&\n\u0003\u0002\u0002\u0002",
    "\'(\u0007\"\u0002\u0002()\u0003\u0002\u0002\u0002)*\b\u0006\u0002\u0002",
    "*\f\u0003\u0002\u0002\u0002+-\n\u0004\u0002\u0002,+\u0003\u0002\u0002",
    "\u0002-.\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002",
    "\u0002\u0002/\u000e\u0003\u0002\u0002\u0002\u0007\u0002\u0012\u0014",
    "!.\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

class ArgsLexer extends antlr4.Lexer {
    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
        return this;
    }

    get atn() {
            return atn;
    }
}

ArgsLexer.EOF = antlr4.Token.EOF;
ArgsLexer.STRING = 1;
ArgsLexer.EQUALS = 2;
ArgsLexer.DASH = 3;
ArgsLexer.WS = 4;
ArgsLexer.ELEMENT = 5;

ArgsLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

ArgsLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ArgsLexer.prototype.literalNames = [ null, null, "'='", "'-'", "' '" ];

ArgsLexer.prototype.symbolicNames = [ null, "STRING", "EQUALS", "DASH", 
                                      "WS", "ELEMENT" ];

ArgsLexer.prototype.ruleNames = [ "STRING", "EscapeSequence", "EQUALS", 
                                  "DASH", "WS", "ELEMENT" ];

ArgsLexer.prototype.grammarFileName = "ArgsLexer.g4";



exports.ArgsLexer = ArgsLexer;

