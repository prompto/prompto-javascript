var prompto = require("../../../main/prompto/index.js");
var parseString = require("../parser/BaseOParserTest.js").parseString;

it("validates a mixed set of Type and values", () => {
    const code = `
@WidgetProperties({fluid: <Boolean, <"sm", "md", "lg", "xl">, null>})
widget Thing;

widget Container {
    method render() {
        return <>
                <Thing fluid />
                <Thing fluid={true} />
                <Thing fluid="sm" />
            </>;
    }
}
`;
    var decls = parseString(code);
    var context = prompto.runtime.Context.newGlobalsContext();
    decls.register(context);
    var listener = new prompto.problem.ProblemCollector();
    context.problemListener = listener;
    decls.check(context);
    expect(listener.problems.length).toBe(0);
});

