// Generated from ArgsParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ArgsParserListener = require('./ArgsParserListener').ArgsParserListener;
var grammarFileName = "ArgsParser.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0007\u001e\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0003\u0002\u0007\u0002\f\n\u0002\f\u0002",
    "\u000e\u0002\u000f\u000b\u0002\u0003\u0003\u0005\u0003\u0012\n\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0005\u0005\u001c\n\u0005\u0003\u0005\u0002",
    "\u0002\u0006\u0002\u0004\u0006\b\u0002\u0002\u0002\u001c\u0002\r\u0003",
    "\u0002\u0002\u0002\u0004\u0011\u0003\u0002\u0002\u0002\u0006\u0017\u0003",
    "\u0002\u0002\u0002\b\u001b\u0003\u0002\u0002\u0002\n\f\u0005\u0004\u0003",
    "\u0002\u000b\n\u0003\u0002\u0002\u0002\f\u000f\u0003\u0002\u0002\u0002",
    "\r\u000b\u0003\u0002\u0002\u0002\r\u000e\u0003\u0002\u0002\u0002\u000e",
    "\u0003\u0003\u0002\u0002\u0002\u000f\r\u0003\u0002\u0002\u0002\u0010",
    "\u0012\u0007\u0005\u0002\u0002\u0011\u0010\u0003\u0002\u0002\u0002\u0011",
    "\u0012\u0003\u0002\u0002\u0002\u0012\u0013\u0003\u0002\u0002\u0002\u0013",
    "\u0014\u0005\u0006\u0004\u0002\u0014\u0015\u0007\u0004\u0002\u0002\u0015",
    "\u0016\u0005\b\u0005\u0002\u0016\u0005\u0003\u0002\u0002\u0002\u0017",
    "\u0018\u0007\u0007\u0002\u0002\u0018\u0007\u0003\u0002\u0002\u0002\u0019",
    "\u001c\u0007\u0007\u0002\u0002\u001a\u001c\u0007\u0003\u0002\u0002\u001b",
    "\u0019\u0003\u0002\u0002\u0002\u001b\u001a\u0003\u0002\u0002\u0002\u001c",
    "\t\u0003\u0002\u0002\u0002\u0005\r\u0011\u001b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, "'='", "'-'", "' '" ];

var symbolicNames = [ null, "STRING", "EQUALS", "DASH", "WS", "ELEMENT" ];

var ruleNames =  [ "parse", "entry", "key", "value" ];

function ArgsParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ArgsParser.prototype = Object.create(antlr4.Parser.prototype);
ArgsParser.prototype.constructor = ArgsParser;

Object.defineProperty(ArgsParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ArgsParser.EOF = antlr4.Token.EOF;
ArgsParser.STRING = 1;
ArgsParser.EQUALS = 2;
ArgsParser.DASH = 3;
ArgsParser.WS = 4;
ArgsParser.ELEMENT = 5;

ArgsParser.RULE_parse = 0;
ArgsParser.RULE_entry = 1;
ArgsParser.RULE_key = 2;
ArgsParser.RULE_value = 3;

function ParseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ArgsParser.RULE_parse;
    this.e = null; // EntryContext
    return this;
}

ParseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParseContext.prototype.constructor = ParseContext;

ParseContext.prototype.entry = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EntryContext);
    } else {
        return this.getTypedRuleContext(EntryContext,i);
    }
};

ParseContext.prototype.enterRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.enterParse(this);
	}
};

ParseContext.prototype.exitRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.exitParse(this);
	}
};




ArgsParser.ParseContext = ParseContext;

ArgsParser.prototype.parse = function() {

    var localctx = new ParseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, ArgsParser.RULE_parse);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===ArgsParser.DASH || _la===ArgsParser.ELEMENT) {
            this.state = 8;
            localctx.e = this.entry();
            this.state = 13;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function EntryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ArgsParser.RULE_entry;
    this.k = null; // KeyContext
    this.v = null; // ValueContext
    return this;
}

EntryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntryContext.prototype.constructor = EntryContext;

EntryContext.prototype.EQUALS = function() {
    return this.getToken(ArgsParser.EQUALS, 0);
};

EntryContext.prototype.key = function() {
    return this.getTypedRuleContext(KeyContext,0);
};

EntryContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
};

EntryContext.prototype.DASH = function() {
    return this.getToken(ArgsParser.DASH, 0);
};

EntryContext.prototype.enterRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.enterEntry(this);
	}
};

EntryContext.prototype.exitRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.exitEntry(this);
	}
};




ArgsParser.EntryContext = EntryContext;

ArgsParser.prototype.entry = function() {

    var localctx = new EntryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ArgsParser.RULE_entry);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 15;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===ArgsParser.DASH) {
            this.state = 14;
            this.match(ArgsParser.DASH);
        }

        this.state = 17;
        localctx.k = this.key();
        this.state = 18;
        this.match(ArgsParser.EQUALS);
        this.state = 19;
        localctx.v = this.value();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function KeyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ArgsParser.RULE_key;
    return this;
}

KeyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
KeyContext.prototype.constructor = KeyContext;

KeyContext.prototype.ELEMENT = function() {
    return this.getToken(ArgsParser.ELEMENT, 0);
};

KeyContext.prototype.enterRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.enterKey(this);
	}
};

KeyContext.prototype.exitRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.exitKey(this);
	}
};




ArgsParser.KeyContext = KeyContext;

ArgsParser.prototype.key = function() {

    var localctx = new KeyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, ArgsParser.RULE_key);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 21;
        this.match(ArgsParser.ELEMENT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ArgsParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;


 
ValueContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ELEMENTContext(parser, ctx) {
	ValueContext.call(this, parser);
    ValueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ELEMENTContext.prototype = Object.create(ValueContext.prototype);
ELEMENTContext.prototype.constructor = ELEMENTContext;

ArgsParser.ELEMENTContext = ELEMENTContext;

ELEMENTContext.prototype.ELEMENT = function() {
    return this.getToken(ArgsParser.ELEMENT, 0);
};
ELEMENTContext.prototype.enterRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.enterELEMENT(this);
	}
};

ELEMENTContext.prototype.exitRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.exitELEMENT(this);
	}
};


function STRINGContext(parser, ctx) {
	ValueContext.call(this, parser);
    ValueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

STRINGContext.prototype = Object.create(ValueContext.prototype);
STRINGContext.prototype.constructor = STRINGContext;

ArgsParser.STRINGContext = STRINGContext;

STRINGContext.prototype.STRING = function() {
    return this.getToken(ArgsParser.STRING, 0);
};
STRINGContext.prototype.enterRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.enterSTRING(this);
	}
};

STRINGContext.prototype.exitRule = function(listener) {
    if(listener instanceof ArgsParserListener ) {
        listener.exitSTRING(this);
	}
};



ArgsParser.ValueContext = ValueContext;

ArgsParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, ArgsParser.RULE_value);
    try {
        this.state = 25;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ArgsParser.ELEMENT:
            localctx = new ELEMENTContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 23;
            this.match(ArgsParser.ELEMENT);
            break;
        case ArgsParser.STRING:
            localctx = new STRINGContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 24;
            this.match(ArgsParser.STRING);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.ArgsParser = ArgsParser;
