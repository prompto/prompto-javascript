var prompto = require("../../../../main/prompto/index");
var base = require("../../parser/BaseOParserTest");

test('Transpiled WidgetField', () => {
    const decls = base.parseResource("annotations/WidgetField.poc");
    const context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    const transpiler = new prompto.runtime.Transpiler(context);
    const decl = context.getRegisteredDeclaration(new prompto.grammar.Identifier("Container"));
    decl.declare(transpiler);
    decl.transpile(transpiler);
    const js = transpiler.toString();
    expect(js.indexOf("this.state.stuff")).toBeTruthy();
});
