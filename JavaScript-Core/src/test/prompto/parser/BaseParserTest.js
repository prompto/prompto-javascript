var path = require("path");
var fs = require("fs");
import * as prompto from "../../../main/prompto/index.js";

var antlr4 = require("antlr4");
var Out = require("../runtime/utils/Out").Out;

var locateMethod = prompto.runtime.locateMethod;
var JsxValue = prompto.value.JsxValue;

// mock ReactBootstrap.Button for native widget tests
global.ReactBootstrap = { Button: function() { this.render = function() { return new JsxValue(null); }; return this; } };
// disable unavailable callbacks for property type checking
prompto.jsx.JsxElementBase.set_HTML_TEST_MODE(true);

function getPromptoFolder() {
    var prompto = module.filename;
    while (path.basename(prompto).indexOf("prompto-") != 0) {
        var parent = path.dirname(prompto);
        if (parent == prompto)
            throw "Could not find prompto root!";
        prompto = parent;
    }
    return prompto;
};

function getResourcesFolder() {
    var prompto = getPromptoFolder();
	return path.normalize(prompto + path.sep + "prompto-tests" + path.sep + "Tests" + path.sep + "resources");
}

function getLibrariesFolder() {
    var prompto = getPromptoFolder();
    return path.normalize(prompto + path.sep + "prompto-libraries");
}

var resourcesFolder = getResourcesFolder();
var librariesFolder = getLibrariesFolder();

exports.coreContext = null;

exports.getResource = function(fileName) {
	fileName = fileName.replace("/", path.sep);
	var fullPath = path.normalize(resourcesFolder + path.sep + fileName);
    if(!fs.existsSync(fullPath))
        fullPath = path.normalize(librariesFolder + path.sep + fileName);
	return new antlr4.FileStream(fullPath);
};

exports.getResourceAsString = function(fileName) {
    fileName = fileName.replace("/", path.sep);
    var fullPath = path.normalize(resourcesFolder + path.sep + fileName);
    if(!fs.existsSync(fullPath))
        fullPath = path.normalize(librariesFolder + path.sep + fileName);
    return fs.readFileSync(fullPath).toString();
}

function readExpected(fileName) {
	var idx = fileName.lastIndexOf('.');
	fileName = fileName.substring(0, idx) + ".txt";
	fileName = fileName.replace("/", path.sep);
    var fullPath = path.normalize(resourcesFolder + path.sep + fileName);
    if(!fs.existsSync(fullPath))
        fullPath = path.normalize(librariesFolder + path.sep + fileName);
	var all = fs.readFileSync(fullPath).toString();
	return all.split("\n");
}

exports.checkSameOutput = function(resource) {
	var read = Out.read();
	var expected = readExpected(resource);
	if(expected.length===1) {
		expect(read).toEqual(expected[0]);
	} else {
		for(var idx=0;idx<expected.length;idx++) {
			if(read===expected[idx])
				return;
		}
		expect(read).toEqual(expected[0]); // to get a display
	}
};

function parseEString(input) {
    var parser = new prompto.parser.ECleverParser(input);
    return parser.parse();
}

function parseOString(input) {
    var parser = new prompto.parser.OCleverParser(input);
    return parser.parse();
}

function parseMString(input) {
    var parser = new prompto.parser.MCleverParser(input);
    return parser.parse();
}

function assertEquivalent( expected, actual) {
    expected = removeWhitespace(expected).replace("modulo","%");
    actual = removeWhitespace(actual).replace("modulo","%");
    expect(actual).toEqual(expected);
}

function removeWhitespace(s) {
    s = replaceAll(s, "\n", "");
    s = replaceAll(s, "\t", "")
    s = replaceAll(s, " ", "");
    return s;
}

function replaceAll(s, a, b) {
    return s.split(a).join(b);
}

exports.compareResourceEOE = function(resourceName) {
    var expected = exports.getResourceAsString(resourceName);
    // console.log(expected);
    // parse e source code
    var dle = parseEString(expected);
    var context = prompto.runtime.Context.newGlobalsContext();
    dle.register(context);
    // rewrite as o
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, context);
    dle.toDialect(writer);
    var o = writer.toString();
    // console.log(o);
    // parse o source code
    var dlo = parseOString(o);
    context = prompto.runtime.Context.newGlobalsContext();
    dlo.register(context);
    // rewrite as e
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E, context);
    dlo.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(expected, actual);
};

exports.compareResourceEME = function(resourceName) {
    var expected = exports.getResourceAsString(resourceName);
    // console.log(expected);
    // parse e source code
    var dle = parseEString(expected);
    var context = prompto.runtime.Context.newGlobalsContext();
    dle.register(context);
    // rewrite as o
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, context);
    dle.toDialect(writer);
    var p = writer.toString();
    // console.log(p);
    // parse p source code
    var dlp = parseMString(p);
    context = prompto.runtime.Context.newGlobalsContext();
    dlp.register(context);
    // rewrite as e
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E, context);
    dlp.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(expected, actual);
};

exports.compareResourceOEO = function(resourceName) {
    var expected = exports.getResourceAsString(resourceName);
    // console.log(expected);
    // parse o source code
    var dlo = parseOString(expected);
    var context = prompto.runtime.Context.newGlobalsContext();
    dlo.register(context);
    // rewrite as e
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E, context);
    dlo.toDialect(writer);
    var e = writer.toString();
    // console.log(e);
    // parse e source code
    var dle = parseEString(e);
    context = prompto.runtime.Context.newGlobalsContext();
    dle.register(context);
    // rewrite as o
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, context);
    dle.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(expected, actual);
};


exports.compareResourceOMO = function(resourceName) {
    var expected = exports.getResourceAsString(resourceName);
    // console.log(expected);
    // parse o source code
    var dlo = parseOString(expected);
    var context = prompto.runtime.Context.newGlobalsContext();
    dlo.register(context);
    // rewrite as p
    var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, context);
    dlo.toDialect(writer);
    var p = writer.toString();
    // console.log(p);
    // parse p source code
    var dlp = parseMString(p);
    context = prompto.runtime.Context.newGlobalsContext();
    dlp.register(context);
    // rewrite as o
    writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, context);
    dlp.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(expected, actual);
};


exports.execute = function(decls, methodName, args) {
    try {
        var context = prompto.runtime.Context.newGlobalsContext();
        decls.register(context);
        decls.check(context);
        if(context.hasTests()) {
            for(var test in context.tests) {
                exports.executeTest(context, test);
            }
        } else {
            exports.executeMethod(context, methodName, args);
        }
    } catch(e) {
        if(e instanceof prompto.error.SyntaxError)
            process.stdout.write(e.message);
        else
            throw e;
    }
};

exports.executeTest = function(context, testName) {
    prompto.store.$DataStore.instance = null; // make sure Store implementation is not transpiled
    var testMethod = context.getTestDeclaration(testName);
    var js = prompto.runtime.Transpiler.transpile(context, testMethod);
    writeToTempFile(js);
    var fn = wrapAndExtract(js, testMethod.cleanId(), context);
    // call test
    fn();
}

exports.executeMethod = function(context, methodName, cmdLineArgs) {
    methodName = methodName || "main";
    var method = locateMethod(context, methodName, cmdLineArgs);
    prompto.store.$DataStore.instance = null; // make sure Store implementation is not transpiled
    var js = prompto.runtime.Transpiler.transpile(context, method);
    writeToTempFile(js);
    var fn = wrapAndExtract(js, method.getTranspiledName(context), context);
    // call method
    cmdLineArgs = cmdLineArgs || new prompto.intrinsic.Dictionary();
    fn(cmdLineArgs);
}


function writeToTempFile(js) {
    var idx = __filename.indexOf(path.sep + "JavaScript-Core" + path.sep);
    var transpiled = __filename.substring(0, idx) + path.sep + "JavaScript-Core" + path.sep + "transpiled.js";
    fs.writeFileSync(transpiled, js);
}

function wrapAndExtract(js, methodName, context) {
    var wrapper = createWrapper(js, methodName);
    // call it to inject/extract data
    var objs = wrapper(context);
    if(objs.store) {
        objs.store.instance = prompto.store.$DataStore.instance = new prompto.memstore.MemStore();
        prompto.memstore.MemStore.Cursor = objs.cursor;
    }
    return objs.method;
}

function createWrapper(js, methodName) {
    // wrap into a function to inject/extract data
    var lines = [
        "(function(context) {",
        "var React = { createElement: function() { return {}; }, Component: function() { return this; } };",
        "var ReactBootstrap = { Button: function() { this.render = function() { return {}; }; return this; } };",
        js,
        "var store = typeof($DataStore) === 'undefined' ? null : $DataStore;",
        "var cursor = typeof(Cursor) === 'undefined' ? null : Cursor;",
        "return { store:  store, cursor: cursor, method: " + methodName + " };",
        "});"
    ];
    js = lines.join("\n");
    // get the function object
    return eval(js);
}


exports.interpret = function(decls, methodName, args, rethrow) {
    try {
        var context = prompto.runtime.Context.newGlobalsContext();
        decls.register(context);
        decls.check(context);
        if(context.hasTests())
            prompto.runtime.Interpreter.interpretTests(context);
        else {
            methodName = methodName || "main";
            args = args || "";
            prompto.runtime.Interpreter.interpret(context, methodName, args);
        }
    } catch(e) {
        if(e instanceof prompto.error.SyntaxError) {
            if(rethrow)
                throw e;
            else
                process.stdout.write(e.message);
        } else
            throw e;
    }
};

