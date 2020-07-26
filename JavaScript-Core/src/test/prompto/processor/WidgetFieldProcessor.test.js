var prompto = require("../../../main/prompto/index");
var parseResource = require("../parser/BaseOParserTest").parseResource;

test('Transpiles WidgetField', () => {
    var decls = parseResource("annotations/WidgetField.poc");
    var context = prompto.runtime.Context.newGlobalsContext();
    decls.register(context);
    var decl = context.getRegisteredDeclaration("Container");
    var js = prompto.runtime.Transpiler.transpile(context, decl);
    expect(js).toEqual(expect.stringContaining("this.state.getMember('stuff"));
});