function EqOp() {
    return this;
}

EqOp.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

EqOp.prototype.toString = function(dialect) {
    if(dialect)
        return dialect.toString(this);
    else
        return Object.prototype.toString.call(this);
};

EqOp.IS = new EqOp();
EqOp.IS.toDialect = function(writer) {
    writer.append('is');
};
EqOp.IS.toString = function(dialect) {
    return 'is';
};

EqOp.IS_NOT = new EqOp();
EqOp.IS_NOT.toDialect = function(writer) {
    writer.append('is not');
};
EqOp.IS_NOT.toString = function(dialect) {
    return 'is not';
};


EqOp.IS_A = new EqOp();
EqOp.IS_A.toDialect = function(writer) {
    writer.append('is a');
};
EqOp.IS_A.toString = function(dialect) {
    return 'is a';
};

EqOp.IS_NOT_A = new EqOp();
EqOp.IS_NOT_A.toDialect = function(writer) {
    writer.append('is not a');
};
EqOp.IS_NOT_A.toString = function(dialect) {
    return 'is not a';
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
EqOp.EQUALS.toEString = function() {
    return '=';
};
EqOp.EQUALS.toOString = function() {
    return '==';
};
EqOp.EQUALS.toPString = function() {
    return '==';
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
EqOp.NOT_EQUALS.toEString = function() {
    return '<>';
};
EqOp.NOT_EQUALS.toOString = function() {
    return '!=';
};
EqOp.NOT_EQUALS.toPString = function() {
    return '!=';
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
EqOp.ROUGHLY.toEString = function() {
    return '~';
};
EqOp.ROUGHLY.toOString = function() {
    return '~=';
};
EqOp.ROUGHLY.toPString = function() {
    return '~=';
};

exports.EqOp = EqOp;
