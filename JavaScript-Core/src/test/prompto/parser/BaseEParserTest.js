var prompto = require("../index"); // prompto
var antlr4 = require("antlr4");
var getResource = require("./BaseParserTest").getResource;
var checkSameOutput = require("./BaseParserTest").checkSameOutput;

function parse(input) {
    var parser = new prompto.parser.ECleverParser(input);
    return parser.parse();
}

exports.parseString = function(code) {
    return parse(code);
};

exports.parseResource = function(fileName) {
	var input = getResource(fileName);
    return parse(input);
};

exports.runResource = function(fileName, methodName, args) {
    var input = getResource(fileName);
    var decls = parse(input);
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    if(context.hasTests())
        prompto.runtime.Interpreter.interpretTests(context);
    else {
        methodName = methodName || "main";
        args = args || "";
        prompto.runtime.Interpreter.interpret(context, methodName, args);
    }
};

exports.checkProblems = function(test, code, expected) {
    var listener = new prompto.parser.ProblemCollector();
    var parser = new prompto.parser.ECleverParser(code);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    if(expected) {
        test.ok(listener.problems.length > 0);
        test.equal(listener.problems[0].message, expected);
    } else
        test.equal(listener.problems.length, 0);
    test.done();
};

exports.checkCompletion = function(test, code, expected) {
    var listener = new prompto.parser.CodeCompleter();
    var parser = new prompto.parser.ECleverParser(code);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    if(expected) {
        test.ok(listener.suggestions.length > 0);
        expected.map(function(suggestion) {
            test.ok(listener.hasSuggestion(suggestion));
        });
    } else
        test.equal(listener.suggestions.length, 0);
    test.done();
};

function findTreeAt(tree, line, column) {
    if(!tree.getChildCount())
        return tree;
    for (var i = 0; i < tree.getChildCount(); i++) {
        var child = tree.getChild(i);
        var startLine = child.symbol ? child.symbol.line : child.start.line;
        if(startLine<line)
            continue;
        var stopColumn = child.symbol ? child.symbol.stop : child.stop.stop;
        if(stopColumn>=column)
            return findTreeAt(child, line, column);
    }
};

function findEnclosingRuleFor(node) {
    if(node.ruleIndex)
        return node;
    return findEnclosingRuleFor(node.parentCtx);
};

exports.checkCompletionAt = function(test, code, line, column, expected) {
    var listener = new prompto.parser.CodeCompleter();
    var parser = new prompto.parser.ECleverParser(code);
    var tree = parser.declaration_list();
    var tokenNode = findTreeAt(tree, line, column);
    var ruleNode = findEnclosingRuleFor(tokenNode);
    var suggestions = []
    var intervals = parser._interp.atn.getExpectedTokens(tokenNode.parentCtx.invokingState, ruleNode);
    intervals.intervals.map(function(interval) {
        for (var t = interval.start; t < interval.stop; t++) {
            var literal = parser.literalNames[t];
            if (literal)
                literal = literal.substring(1, literal.length - 1);
            var suggestion = {type: t, symbol: parser.symbolicNames[t], literal: literal};
            suggestions.push(suggestion);
        }
    });
    if(expected) {
        test.ok(suggestions.length > 0);
        expected.map(function(s) {
            test.ok(suggestions.map(function(s) { return s.literal; }).indexOf(s)>=0);
        });
    } else
        test.equal(suggestions.length, 0);
    test.done();
};

exports.checkOutput = function(test, fileName) {
    exports.runResource(fileName);
    checkSameOutput(test, fileName);
    test.done();
};


