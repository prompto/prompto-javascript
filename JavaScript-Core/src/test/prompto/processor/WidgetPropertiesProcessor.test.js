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


test('Transpiles ReactWidgetProps2 with warnings', () => {
    var warning = null;
    var listener = new prompto.problem.ProblemCollector()
    listener.reportInvalidMember = function(section, name) {
        warning = "invalid";
    }
    var decls = parseResource("annotations/ReactWidgetProps2.poc");
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("some stuff"));
    expect(warning).toEqual("invalid");
});