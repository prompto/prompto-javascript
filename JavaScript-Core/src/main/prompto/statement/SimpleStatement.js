var BaseStatement = require("./BaseStatement").BaseStatement;

function SimpleStatement() {
    BaseStatement.call(this);
    return this;
}

SimpleStatement.prototype = Object.create(BaseStatement.prototype);
SimpleStatement.prototype.constructor = SimpleStatement;

SimpleStatement.prototype.isSimple = function() {
    return true;
};


exports.SimpleStatement = SimpleStatement;
