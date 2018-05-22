var path = require("path");
var fs = require("fs");

var antlr4 = require("antlr4");
var prompto = require("../index"); // prompto
var BaseParserTest = require("./BaseParserTest");
var getResource = BaseParserTest.getResource;
var checkSameOutput = BaseParserTest.checkSameOutput;
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

exports.interpretResource = function(fileName, methodName, args) {
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


exports.executeResource = function(fileName, methodName, args) {
    var input = getResource(fileName);
    var decls = parse(input);
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    if(context.hasTests()) {
        for(var test in context.tests) {
            executeTest(context, test);
        }
    } else {
        executeMethod(context, methodName, args);
    }
};

function executeTest(context, testName) {
    var testMethod = context.getTestDeclaration(testName);
    var js = prompto.runtime.Transpiler.transpileTest(context, testMethod);
    var idx = __filename.indexOf(path.sep + "JavaScript-Core" + path.sep);
    var transpiled = __filename.substring(0, idx) + path.sep + "JavaScript-Core" + path.sep + "transpiled.js";
    fs.writeFile(transpiled, js);
    js = "var transpiled = function() {" + js + " \nreturn " + testMethod.cleanId() + "; }; transpiled();";
    var fn = eval(js);
    fn();
}

function executeMethod(context, methodName, args) {
    methodName = methodName || "main";
    var js = prompto.runtime.Transpiler.transpileMethod(context, methodName);
    var idx = __filename.indexOf(path.sep + "JavaScript-Core" + path.sep);
    var transpiled = __filename.substring(0, idx) + path.sep + "JavaScript-Core" + path.sep + "transpiled.js";
    fs.writeFile(transpiled, js);
    var lines = [
        "(function() {",
        js,
        "var store = typeof(DataStore) === 'undefined' ? null : DataStore;",
        "return { store:  store, method: " + methodName + "};",
        "})();"
    ];
    js = lines.join("\n");
    var objs = eval(js);
    if(objs.store)
        objs.store.instance = prompto.store.DataStore.instance = new prompto.memstore.MemStore();
    args = args || new prompto.intrinsic.Dictionary();
    objs.method(args);
}


exports.checkProblems = function(test, code, expected) {
    var listener = new prompto.problem.ProblemCollector();
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
    var listener = new prompto.problem.CodeCompleter();
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

exports.checkInterpretedOutput = function(test, fileName) {
    prompto.store.DataStore.instance = new prompto.memstore.MemStore();
    exports.interpretResource(fileName);
    checkSameOutput(test, fileName);
    test.done();
};

exports.checkTranspiledOutput = function(test, fileName) {
    // prompto.store.DataStore.instance = new prompto.memstore.MemStore();
    // exports.executeResource(fileName);
    // checkSameOutput(test, fileName);
    test.done();
};

exports.loadDependency = function(libraryName) {
    if (BaseParserTest.coreContext == null)
        BaseParserTest.coreContext = prompto.runtime.Context.newGlobalContext();
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


exports.runTests = function(test, fileName) {
    decls = exports.parseResource(fileName)
    decls.map(function(decl) {
        if (!(decl instanceof prompto.declaration.TestMethodDeclaration))
            return;
        Out.reset()
        prompto.runtime.Interpreter.interpretTest(BaseParserTest.coreContext, decl.name);
        var expected = decl.name + " test successful";
        var read = Out.read();
        test.equal(read, expected);
    });
    test.done();
};

