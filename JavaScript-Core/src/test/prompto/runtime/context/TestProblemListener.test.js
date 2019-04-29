var checkProblems = require("../../parser/BaseEParserTest").checkProblems;

test('NoError', () => {
    var code = "define name as Text attribute\n";
    checkProblems(code);
});

test('LexerError', () => {
    var code = "\"abc";
    checkProblems(code, "token recognition error at: '\"abc'");
});

test('SyntaxError', () => {
    var code = "define id as Text attribute\n" +
               "define name as";
    checkProblems(code, "no viable alternative at input 'define name as'");
});

test('DuplicateAttribute', () => {
    var code = "define name as Text attribute\n" +
        "define name as Text attribute\n";
    checkProblems(code, "Duplicate name: name");
});

test('DuplicateCategory', () => {
    var code = "define name as Text attribute\n" +
        "define Person as category with attribute name\n" +
        "define Person as category with attribute name\n";
    checkProblems(code, "Duplicate name: Person");
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
    checkProblems(code, "Duplicate name: \"find id\"");
});


test('DuplicateMethod', () => {
    var code = "define print as method doing:\n" +
            "\treturn 0\n" +
            "define print as method doing:\n" +
            "\treturn 0\n";
    checkProblems(code, "Duplicate name: print");
});

test('NonDuplicateMethod', () => {
    var code = "define print as method doing:\n" +
        "\treturn 0\n" +
        "define print as method receiving Text t doing:\n" +
        "\treturn 0\n";
    checkProblems(code);
});

test('UnknownCategory', () => {
    var code = "define customer as Customer attribute\n";
    checkProblems(code, "Unknown category: Customer");
});

test('KnownCategory', () => {
    var code = "define customer as Text attribute\n";
    checkProblems(code);
});

test('UnknownAttribute', () => {
    var code = "define Customer as category with attribute cool\n";
    checkProblems(code, "Unknown attribute: cool");
});

test('KnownAttribute', () => {
    var code = "define name as Text attribute\n" +
        "define Customer as category with attribute name\n";
    checkProblems(code);
});

test('UnknownMethod', () => {
    var code = "define m as method doing:\n" +
        "\tprint \"abc\"\n";
    checkProblems(code, "Unknown method: print");
});

test('KnownMethod', () => {
    var code = "define print as method receiving Text value doing:\n" +
        "\ta = 3\n" +
        "define m as method doing:\n" +
        "\tprint \"abc\"\n";
    checkProblems(code);
});

test('NoMatchingPrototype', () => {
    var code = "define print as method receiving Text value doing:\n" +
        "\ta = 3\n" +
        "define m2 as method doing:\n" +
        "\tprint 22\n";
    checkProblems(code, "No matching prototype for: print 22");
});

test('NoMatchingPrototype2', () => {
    var code = "define name as Text attribute\n" +
        "define Customer as category with attribute name\n" +
        "define print as method receiving Text value doing:\n" +
        "\ta = 3\n" +
        "define printCustomer as method receiving Customer c doing:\n" +
        "\tprint c\n";
    checkProblems(code, "No matching prototype for: print c");
});

test('MatchingPrototype', () => {
    var code = "define print as method receiving Text value doing:\n" +
        "\ta = 3\n" +
        "define m2 as method doing:\n" +
        "\tprint \"abc\"\n";
    checkProblems(code);
});
