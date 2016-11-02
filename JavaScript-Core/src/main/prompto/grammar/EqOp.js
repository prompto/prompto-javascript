function EqOp(name) {
    this.name = name
    return this;
}

EqOp.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

EqOp.prototype.toString = function(dialect) {
    if(dialect)
        return dialect.toString(this);
    else
        return this.name;
};

EqOp.IS = new EqOp("IS");
EqOp.IS.toDialect = function(writer) {
    writer.append('is');
};
EqOp.IS.toEString = function(dialect) {
    return 'is';
};
EqOp.IS.toOString = EqOp.IS.toEString;
EqOp.IS.toSString = EqOp.IS.toEString;

EqOp.IS_NOT = new EqOp("IS_NOT");
EqOp.IS_NOT.toDialect = function(writer) {
    writer.append('is not');
};
EqOp.IS_NOT.toEString = function(dialect) {
    return 'is not';
};
EqOp.IS_NOT.toOString = EqOp.IS_NOT.toEString;
EqOp.IS_NOT.toSString = EqOp.IS_NOT.toEString;


EqOp.IS_A = new EqOp("IS_A");
EqOp.IS_A.toDialect = function(writer) {
    writer.append('is a');
};
EqOp.IS_A.toEString = function(dialect) {
    return 'is a';
};
EqOp.IS_A.toOString = EqOp.IS_A.toEString;
EqOp.IS_A.toSString = EqOp.IS_A.toEString;

EqOp.IS_NOT_A = new EqOp("IS_NOT_A");
EqOp.IS_NOT_A.toDialect = function(writer) {
    writer.append('is not a');
};
EqOp.IS_NOT_A.toEString = function(dialect) {
    return 'is not a';
};
EqOp.IS_NOT_A.toOString = EqOp.IS_NOT_A.toEString;
EqOp.IS_NOT_A.toSString = EqOp.IS_NOT_A.toEString;

EqOp.EQUALS = new EqOp("EQUALS");
EqOp.EQUALS.toEDialect = function(writer) {
    writer.append('=');
};
EqOp.EQUALS.toODialect = function(writer) {
    writer.append('==');
};
EqOp.EQUALS.toSDialect = function(writer) {
    writer.append('==');
};
EqOp.EQUALS.toEString = function() {
    return '=';
};
EqOp.EQUALS.toOString = function() {
    return '==';
};
EqOp.EQUALS.toSString = function() {
    return '==';
};

EqOp.NOT_EQUALS = new EqOp("NOT_EQUALS");
EqOp.NOT_EQUALS.toEDialect = function(writer) {
    writer.append('<>');
};
EqOp.NOT_EQUALS.toODialect = function(writer) {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toSDialect = function(writer) {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toEString = function() {
    return '<>';
};
EqOp.NOT_EQUALS.toOString = function() {
    return '!=';
};
EqOp.NOT_EQUALS.toSString = function() {
    return '!=';
};

EqOp.ROUGHLY = new EqOp("ROUGHLY");
EqOp.ROUGHLY.toEDialect = function(writer) {
    writer.append('~');
};
EqOp.ROUGHLY.toODialect = function(writer) {
    writer.append('~=');
};
EqOp.ROUGHLY.toSDialect = function(writer) {
    writer.append('~=');
};
EqOp.ROUGHLY.toEString = function() {
    return '~';
};
EqOp.ROUGHLY.toOString = function() {
    return '~=';
};
EqOp.ROUGHLY.toSString = function() {
    return '~=';
};

exports.EqOp = EqOp;
