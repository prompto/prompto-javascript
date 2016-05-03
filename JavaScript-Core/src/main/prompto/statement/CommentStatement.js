var BaseStatement = require("./BaseStatement").BaseStatement;
var Dialect = require("../parser/Dialect").Dialect;
var VoidType = require("../type/VoidType").VoidType;

function CommentStatement(text) {
    BaseStatement.call(this);
    this.text = text;
    return this;
}

CommentStatement.prototype = Object.create(BaseStatement.prototype);
CommentStatement.prototype.constructor = CommentStatement;

CommentStatement.prototype.check = function(context) {
    return VoidType.instance;
};

CommentStatement.prototype.interpret = function(context) {
    return null;
};

function uncomment(line) {
    if (line.indexOf("#")===0)
        return line.substring(1);
    else if(line.indexOf("//")===0)
        return line.substring(2);
    else
        return line;
}

CommentStatement.prototype.toDialect = function(writer) {
    var lines = this.text.split("\n");
    lines = lines.map(function (line) {
        return uncomment(line);
    });
    switch (writer.dialect) {
        case Dialect.E:
        case Dialect.O:
            if (lines.length > 1) {
                writer.append("/*");
                lines.forEach(function (line) {
                    writer.append(line)
                    writer.newLine();
                });
                writer.trimLast(1);
                writer.append("*/");
                writer.newLine();
            } else {
                writer.append("//");
                writer.append(lines[0]);
                writer.newLine();
            }
            break;
        case Dialect.S:
            lines.forEach(function (line) {
                writer.append("#")
                writer.append(line)
                writer.newLine()
            });
            break;
    }
};

exports.CommentStatement = CommentStatement;