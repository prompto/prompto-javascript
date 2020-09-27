var csvIterate = require("../../main/prompto/reader/CSVReader").csvIterate;
var DocumentJs = require("../../../../JavaScript-Core/src/main/prompto/intrinsic/Document");
intrinsic = {
    Document: DocumentJs["default"]
};

test('NullRetursnEmptyIterator', () => {
    var iter = csvIterate(null, ',', '"');
    expect(iter.hasNext()).toBeFalsy();
});


test('EmptyRetursnEmptyIterator', () => {
    var iter = csvIterate("", ',', '"');
    expect(iter.hasNext()).toBeFalsy();
});


test('SimpleNoQuotes', () => {
    var csv = "id,name\n1,John\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("John");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});


test('EscapeNoQuotes', () => {
    var csv = "id,name\n1,John\n2,Riou\\, Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("John");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Riou, Sylvie");
});


test('SimpleQuotes', () => {
    var csv = "\"id\",\"name\"\n1,\"John\"\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("John");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});


test('EmptyValue', () => {
    var csv = "\"id\",\"name\"\n,\"John\"\n2,\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toBeFalsy();
    expect(doc["name"]).toEqual("John");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toBeFalsy();
});


test('MissingValue', () => {
    var csv = "\"id\",\"name\"\n1\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toBeFalsy();
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});


test('ExtraValue', () => {
    var csv = "\"id\",\"name\"\n1,\"John\",Doe\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("John");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});


test('InnerQuote', () => {
    var csv = "id,name\n1,Jo\"hn\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("Jo\"hn");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});

test('QuotedInnerQuote', () => {
    var csv = "id,name\n1,\"Jo\"\"hn\"\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("Jo\"hn");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});

test('QuotedInnerNewLine', () => {
    var csv = "id,name\n1,\"Jo\nhn\"\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("1");
    expect(doc["name"]).toEqual("Jo\nhn");
    doc = iter.next();
    expect(doc).toBeTruthy();
    expect(doc["id"]).toEqual("2");
    expect(doc["name"]).toEqual("Sylvie");
});
