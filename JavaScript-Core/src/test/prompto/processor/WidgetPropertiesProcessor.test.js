var prompto = require("../../../main/prompto/index");
var parseResource = require("../parser/BaseOParserTest").parseResource;

test('Transpiles WidgetProps1', () => {
    var decls = parseResource("annotations/WidgetProps1.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("some stuff"));
});


test('Transpiles WidgetProps2 with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportIllegalAssignment = function(section, expected, actual) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/WidgetProps2.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("123.54"));
    expect(warning).toEqual("invalid");
});


test('Transpiles WidgetProps3', () => {
    var decls = parseResource("annotations/WidgetProps3.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("some stuff"));
});


test('Transpiles WidgetProps4 with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportIllegalAssignment = function(section, expected, actual) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/WidgetProps4.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("123.54"));
    expect(warning).toEqual("invalid");
});


test('Transpiles WidgetChildProps1', () => {
    var decls = parseResource("annotations/WidgetChildProps1.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("some stuff"));
});


test('Transpiles ReactWidgetProps1', () => {
    var decls = parseResource("annotations/ReactWidgetProps1.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("1961-02-25"));
});


test('Transpiles Required', () => {
    var decls = parseResource("annotations/WidgetProps5.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("Hello"));
});


test('Transpiles Required with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportMissingProperty = function(section, name) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/WidgetProps6.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("stuff"));
    expect(warning).toEqual("invalid");
});


test('Transpiles TypeSet', () => {
    var decls = parseResource("annotations/WidgetProps7.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("Hello"));
});


test('Transpiles TypeSet with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportIllegalAssignment = function(section, required, actual) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/WidgetProps8.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("stuff"));
    expect(warning).toEqual("invalid");
});


test('Transpiles ValueSet', () => {
    var decls = parseResource("annotations/WidgetProps9.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("John"));
});


test('Transpiles ValueSet with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportIllegalValue = function(section, message) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/WidgetProps10.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("stuff"));
    expect(warning).toEqual("invalid");
});


test('Transpiles Callback', () => {
    var decls = parseResource("annotations/WidgetProps11.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    prompto.jsx.JsxElementBase.set_HTML_TEST_MODE(false);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("stuff"));
});

test('Transpiles Arrow', () => {
    var decls = parseResource("annotations/WidgetProps12.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("stuff"));
});

test('Loads Html properties', () => {
    var context = prompto.runtime.Context.newGlobalContext();
    registerDummyCallbacks(context);
    prompto.jsx.JsxElementBase.set_HTML_TEST_MODE(false);
    var props = prompto.jsx.JsxElementBase.getHtmlProperties(context);
    expect(props).not.toBeNull();
});

function registerDummyCallbacks(context) {
    [ "ClickEventCallback", "MouseEventCallback", "InputChangedCallback" ].forEach( function(name) {
        var decl = new prompto.declaration.AbstractMethodDeclaration(new prompto.grammar.Identifier(name));
        decl.register(context);
    });
}