function EqOp() {
    return this;
}

EqOp.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

EqOp.IS = new EqOp();
EqOp.IS.toDialect = function(writer) {
    writer.append('is');
};

EqOp.IS_NOT = new EqOp();
EqOp.IS_NOT.toDialect = function(writer) {
    writer.append('is not');
};

EqOp.IS_A = new EqOp();
EqOp.IS_A.toDialect = function(writer) {
    writer.append('is a');
};

EqOp.IS_NOT_A = new EqOp();
EqOp.IS_NOT_A.toDialect = function(writer) {
    writer.append('is not a');
};

EqOp.EQUALS = new EqOp();
EqOp.EQUALS.toEDialect = function(writer) {
    writer.append('=');
};
EqOp.EQUALS.toODialect = function(writer) {
    writer.append('==');
};
EqOp.EQUALS.toPDialect = function(writer) {
    writer.append('==');
};

EqOp.NOT_EQUALS = new EqOp();
EqOp.NOT_EQUALS.toEDialect = function(writer) {
    writer.append('<>');
};
EqOp.NOT_EQUALS.toODialect = function(writer) {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toPDialect = function(writer) {
    writer.append('!=');
};

EqOp.ROUGHLY = new EqOp();
EqOp.ROUGHLY.toEDialect = function(writer) {
    writer.append('~');
};
EqOp.ROUGHLY.toODialect = function(writer) {
    writer.append('~=');
};
EqOp.ROUGHLY.toPDialect = function(writer) {
    writer.append('~=');
};

exports.EqOp = EqOp;
