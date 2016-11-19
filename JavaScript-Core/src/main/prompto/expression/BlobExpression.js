var BlobType = require("../type/BlobType").BlobType;
var Document = require("../value/Document").Document;
var Blob = require("../value/Blob").Blob;
var Dialect = require("../parser/Dialect").Dialect;
var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
var stringToUtf8Buffer = require("../utils/Utils").stringToUtf8Buffer;

function BlobExpression(source) {
    this.source = source;
    return this;
}


BlobExpression.prototype.check = function(context) {
    this.source.check(context);
    return BlobType.instance;
};


BlobExpression.prototype.interpret = function(context) {
    var value = this.source.interpret(context);
    // try {
        var datas = BlobExpression.collectDatas(context, value);
        var zipped = BlobExpression.zipDatas(datas);
        return new Blob("application/zip", zipped);
    // } catch (e) {
    //     throw new ReadWriteError(e.message);
    // }
};


BlobExpression.collectDatas = function(context, value) {
    var binaries = {};
    // create json type-aware object graph and collect binaries
    var values = {}; // need a temporary parent
    value.toJson(context, values, null, "value", binaries);
    var json = JSON.stringify(values["value"]);
    // add it
    binaries["value.json"] = stringToUtf8Buffer(json);
    return binaries;
};


BlobExpression.zipDatas = function(datas) {
    var JSZip = require("jszip-sync");
    var zip = new JSZip();
    return zip.sync(function() {
        for (var key in datas)
            zip.file(key, datas[key]);
        var result = null;
        zip.generateAsync({type: "arraybuffer", compression: "DEFLATE"}).
            then(function(value) {
                result = value;
            });
        return result;
    });
};

BlobExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


BlobExpression.prototype.toEDialect = function(writer) {
    writer.append("Blob from ");
    this.source.toDialect(writer);
};

BlobExpression.prototype.toODialect = function(writer) {
    writer.append("Blob(");
    this.source.toDialect(writer);
    writer.append(')');
};

BlobExpression.prototype.toMDialect = function(writer) {
    writer.append("Blob(");
    this.source.toDialect(writer);
    writer.append(')');
};

exports.BlobExpression = BlobExpression;
