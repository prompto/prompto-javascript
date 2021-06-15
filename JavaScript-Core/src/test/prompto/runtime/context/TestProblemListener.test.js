var checkProblemsInline = require("../../parser/BaseEParserTest").checkProblemsInline;

// TODO move this to generated TestProblems

test('NoError', () => {
    var code = "define name as Text attribute\n";
    checkProblemsInline(code);
});

test('LexerError', () => {
    var code = "\"abc";
    checkProblemsInline(code, "mismatched input '\"' expecting {<EOF>, LF, COMMENT, 'define', ARONDBASE_IDENTIFIER}");
});

test('SyntaxError', () => {
    var code = "define id as Text attribute\n" +
               "define name as";
    checkProblemsInline(code, "no viable alternative at input 'define name as'");
});

test('DuplicateAttribute', () => {
    var code = "define name as Text attribute\n" +
        "define name as Text attribute\n";
    checkProblemsInline(code, "Duplicate name: name");
});

test('DuplicateCategory', () => {
    var code = "define name as Text attribute\n" +
        "define Person as category with attribute name\n" +
        "define Person as category with attribute name\n";
    checkProblemsInline(code, "Duplicate name: Person");
});

test('DuplicateTest', () => {
    var code = "define \"find id\" as test method doing:\n" +
                "\ta = 0\n" +
                "and verifying:\n" +
                "\ta = 0\n" +
                "define \"find id\" as test method doing:\n" +
                "\ta = 0\n" +
                "and verifying:\n" +
                "\ta = 0\n";
    checkProblemsInline(code, "Duplicate name: \"find id\"");
});


test('DuplicateMethod', () => {
    var code = "define print as method doing:\n" +
            "\treturn 0\n" +
            "define print as method doing:\n" +
            "\treturn 0\n";
    checkProblemsInline(code, "Duplicate name: print");
});

test('NonDuplicateMethod', () => {
    var code = "define print as method doing:\n" +
        "\treturn 0\n" +
        "define print as method receiving Text t doing:\n" +
        "\treturn 0\n";
    checkProblemsInline(code);
});

test('UnknownCategory', () => {
    var code = "define customer as Customer attribute\n";
    checkProblemsInline(code, "Unknown category: Customer");
});

test('KnownCategory', () => {
    var code = "define customer as Text attribute\n";
    checkProblemsInline(code);
});

test('UnknownAttribute', () => {
    var code = "define Customer as category with attribute cool\n";
    checkProblemsInline(code, "Unknown attribute: cool");
});

test('KnownAttribute', () => {
    var code = "define name as Text attribute\n" +
        "define Customer as category with attribute name\n";
    checkProblemsInline(code);
});

