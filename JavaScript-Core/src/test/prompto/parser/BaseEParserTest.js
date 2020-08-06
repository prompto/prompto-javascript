var path = require("path");
var fs = require("fs");

var antlr4 = require("antlr4");
var prompto = require("../../../main/prompto/index");
var BaseParserTest = require("./BaseParserTest");
var getResource = BaseParserTest.getResource;
var checkSameOutput = BaseParserTest.checkSameOutput;
var execute = BaseParserTest.execute;
var executeTest = BaseParserTest.executeTest;
var interpret = BaseParserTest.interpret;
var interpretTest = prompto.runtime.Interpreter.interpretTest;

var Out = require("../runtime/utils/Out").Out;

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

exports.interpretResource = function(fileName, methodName, args, rethrow) {
    var decls = exports.parseResource(fileName);
    interpret(decls, methodName, args, rethrow);
};


exports.executeResource = function(fileName, methodName, args) {
    var decls = exports.parseResource(fileName);
    execute(decls, methodName, args);
};


exports.checkProblems = function(code, expected) {
    var listener = new prompto.problem.ProblemCollector();
    var parser = new prompto.parser.ECleverParser(code);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalsContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    if(expected) {
        expect(listener.problems.length > 0).toBeTruthy();
        expect(listener.problems[0].message).toEqual(expected);
    } else
        expect(listener.problems.length).toEqual(0);
};

exports.checkCompletion = function(code, expected) {
    var listener = new prompto.problem.CodeCompleter();
    var parser = new prompto.parser.ECleverParser(code);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalsContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    if(expected) {
        expect(listener.suggestions.length > 0).toBeTruthy();
        expected.map(function(suggestion) {
            expect(listener.hasSuggestion(suggestion)).toBeTruthy();
        });
    } else
        expect(listener.suggestions.length).toEqual(0);
};

function findTerminalAt(tree, line, column) {
    if(!tree.getChildCount())
        return tree;
    for (var i = 0, count = tree.getChildCount(); i < count; i++) {
        var child = tree.getChild(i);
        if(child.symbol) {
            if (i < count - 1 && (child.symbol.line<line))
                continue;
            if ( i == count - 1 || child.symbol.column + child.symbol.stop - child.symbol.start >= column)
                return child;
        } else {
            var startLine = child.start.line;
            var stopLine = child.stop.line;
            if (i < count - 1 && (line < startLine || line > stopLine))
                continue;
            var startColumn = line == startLine ? child.start.column : 1;
            var stopColumn = line == stopLine ? child.stop.column + child.stop.stop - child.stop.start : 2 ^ 31;
            if (i < count - 1 && (column < startColumn || column > stopColumn))
                continue;
            return findTerminalAt(child, line, column);
        }
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
    parser._input.tokenSource.addLF = false;
    var tree = parser.declaration_list();
    var tokenNode = findTerminalAt(tree, line, column);
    var ruleNode = findEnclosingRuleFor(tokenNode);
    var suggestions = []
    var intervals = parser._interp.atn.getExpectedTokens(tokenNode.invokingState, ruleNode);
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

exports.checkInterpretedOutput = function(fileName) {
    var MemStoreModule = require("../../../main/prompto/memstore/MemStore");
    MemStoreModule.Cursor = require("../../../main/prompto/intrinsic/Cursor").Cursor;
    prompto.store.$DataStore.instance = new MemStoreModule.MemStore();
    exports.interpretResource(fileName);
    checkSameOutput(fileName);
};

exports.checkTranspiledOutput = function(fileName) {
    exports.executeResource(fileName);
    checkSameOutput(fileName);
};

exports.loadDependency = function(libraryName) {
    if (BaseParserTest.coreContext == null)
        BaseParserTest.coreContext = prompto.runtime.Context.newGlobalsContext();
    var allDecls = null;
    var files = exports.listLibraryFiles(libraryName);
    if (files) files.map(function (file) {
        var resourceName = libraryName + path.sep + file;
        decls = exports.parseResource(resourceName);
        if(!allDecls)
            allDecls = decls;
        else
            allDecls.addAll(decls);
    });
    if(allDecls)
        allDecls.register(BaseParserTest.coreContext);
};

exports.listLibraryFiles = function(libraryName) {
    var idx = __filename.indexOf(path.sep + "JavaScript-Core" + path.sep);
    var dir = __filename.substring(0, idx) + path.sep + "prompto-libraries" + path.sep + libraryName;
    if (fs.existsSync(dir)) {
        var files = fs.readdirSync(dir);
        return files.filter(function (file) {
            return file.indexOf(".pec")>=0 || file.indexOf(".poc")>=0 || file.indexOf(".psc")>=0;
        });
    } else
        return null;
};


exports.runInterpretedTests = function(fileName, options) {
    var MemStoreModule = require("../../../main/prompto/memstore/MemStore");
    MemStoreModule.Cursor = require("../../../main/prompto/intrinsic/Cursor").Cursor;
    prompto.store.$DataStore.instance = new MemStoreModule.MemStore();
    runTests(fileName, interpretTest, options);
};


exports.runTranspiledTests = function(fileName, options) {
    runTests(fileName, executeTest, options);
}

function runTests(fileName, runner, options) {
    decls = exports.parseResource(fileName)
    if(options && options.register)
        decls.register(BaseParserTest.coreContext);
    decls
        .filter(function (decl) {
            return decl instanceof prompto.declaration.TestMethodDeclaration;
        })
        .forEach(function (decl) {
            runTest(decl, runner, options);
        });
}

function runTest(decl, runner, options) {
    Out.reset()
    intrinsic = prompto.intrinsic;
    runner(BaseParserTest.coreContext, decl.name);
    var expected = decl.name + " test successful";
    var actual = Out.read();
    if(options && options.throws) {
        if(actual!==expected)
            throw new Error("Expected:\n" + expected + "\nActual:\n" + actual);
    } else
        expect(actual).toEqual(expected);
}