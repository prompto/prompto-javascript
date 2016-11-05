var csvIterate = require("../../main/prompto/reader/CSVReader").csvIterate;

exports.testNullRetursnEmptyIterator = function(test) {
    var iter = csvIterate(null, ',', '"');
    test.ok(!iter.hasNext());
    test.done();
};


exports.testEmptyRetursnEmptyIterator = function(test) {
    var iter = csvIterate("", ',', '"');
    test.ok(!iter.hasNext());
    test.done();
};


exports.testSimpleNoQuotes = function(test) {
    var csv = "id,name\n1,John\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("John", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
    test.done();
};


exports.testEscapeNoQuotes = function(test) {
    var csv = "id,name\n1,John\n2,Riou\\, Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("John", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Riou, Sylvie", doc["name"]);
    test.done();
};


exports.testSimpleQuotes = function(test) {
    var csv = "\"id\",\"name\"\n1,\"John\"\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("John", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
 test.done();
};


exports.testEmptyValue = function(test) {
    var csv = "\"id\",\"name\"\n,\"John\"\n2,\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.ok(!doc["id"]);
    test.equal("John", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.ok(!doc["name"]);
    test.ok(false);
    test.done();
};


exports.testMissingValue = function(test) {
    var csv = "\"id\",\"name\"\n1\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.ok(!doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
 test.done();
};


exports.testExtraValue = function(test) {
    var csv = "\"id\",\"name\"\n1,\"John\",Doe\n2,\"Sylvie\"\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("John", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
    test.done();
};


exports.testInnerQuote = function(test) {
    var csv = "id,name\n1,Jo\"hn\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("Jo\"hn", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
    test.done();
};

exports.testQuotedInnerQuote = function(test) {
    var csv = "id,name\n1,\"Jo\"\"hn\"\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("Jo\"hn", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
    test.done();
};

exports.testQuotedInnerNewLine = function(test) {
    var csv = "id,name\n1,\"Jo\nhn\"\n2,Sylvie\n";
    var iter = csvIterate(csv, null, ',', '"');
    var doc = iter.next();
    test.ok(doc);
    test.equal("1", doc["id"]);
    test.equal("Jo\nhn", doc["name"]);
    doc = iter.next();
    test.ok(doc);
    test.equal("2", doc["id"]);
    test.equal("Sylvie", doc["name"]);
    test.done();
};
