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
EqOp.IS.toEString = function() {
    return 'is';
};
EqOp.IS.toOString = EqOp.IS.toEString;
EqOp.IS.toMString = EqOp.IS.toEString;

EqOp.IS_NOT = new EqOp("IS_NOT");
EqOp.IS_NOT.toDialect = function(writer) {
    writer.append('is not');
};
EqOp.IS_NOT.toEString = function() {
    return 'is not';
};
EqOp.IS_NOT.toOString = EqOp.IS_NOT.toEString;
EqOp.IS_NOT.toMString = EqOp.IS_NOT.toEString;


EqOp.IS_A = new EqOp("IS_A");
EqOp.IS_A.toDialect = function(writer) {
    writer.append('is a');
};
EqOp.IS_A.toEString = function() {
    return 'is a';
};
EqOp.IS_A.toOString = EqOp.IS_A.toEString;
EqOp.IS_A.toMString = EqOp.IS_A.toEString;

EqOp.IS_NOT_A = new EqOp("IS_NOT_A");
EqOp.IS_NOT_A.toDialect = function(writer) {
    writer.append('is not a');
};
EqOp.IS_NOT_A.toEString = function(dialect) {
    return 'is not a';
};
EqOp.IS_NOT_A.toOString = EqOp.IS_NOT_A.toEString;
EqOp.IS_NOT_A.toMString = EqOp.IS_NOT_A.toEString;

EqOp.EQUALS = new EqOp("EQUALS");
EqOp.EQUALS.toEDialect = function(writer) {
    writer.append('=');
};
EqOp.EQUALS.toODialect = function(writer) {
    writer.append('==');
};
EqOp.EQUALS.toMDialect = function(writer) {
    writer.append('==');
};
EqOp.EQUALS.toEString = function() {
    return '=';
};
EqOp.EQUALS.toOString = function() {
    return '==';
};
EqOp.EQUALS.toMString = function() {
    return '==';
};

EqOp.NOT_EQUALS = new EqOp("NOT_EQUALS");
EqOp.NOT_EQUALS.toEDialect = function(writer) {
    writer.append('<>');
};
EqOp.NOT_EQUALS.toODialect = function(writer) {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toMDialect = function(writer) {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toEString = function() {
    return '<>';
};
EqOp.NOT_EQUALS.toOString = function() {
    return '!=';
};
EqOp.NOT_EQUALS.toMString = function() {
    return '!=';
};

EqOp.ROUGHLY = new EqOp("ROUGHLY");
EqOp.ROUGHLY.toEDialect = function(writer) {
    writer.append('~');
};
EqOp.ROUGHLY.toODialect = function(writer) {
    writer.append('~=');
};
EqOp.ROUGHLY.toMDialect = function(writer) {
    writer.append('~=');
};
EqOp.ROUGHLY.toEString = function() {
    return '~';
};
EqOp.ROUGHLY.toOString = function() {
    return '~=';
};
EqOp.ROUGHLY.toMString = function() {
    return '~=';
};

EqOp.CONTAINS = new EqOp("CONTAINS");
EqOp.CONTAINS.toEDialect = function(writer) {
    writer.append('contains');
};
EqOp.CONTAINS.toODialect = EqOp.CONTAINS.toEDialect;
EqOp.CONTAINS.toMDialect = EqOp.CONTAINS.toEDialect;
EqOp.CONTAINS.toEString = function() {
    return 'contains';
};
EqOp.CONTAINS.toOString = EqOp.CONTAINS.toEString;
EqOp.CONTAINS.toMString = EqOp.CONTAINS.toEString;

EqOp.NOT_CONTAINS = new EqOp("NOT_CONTAINS");
EqOp.NOT_CONTAINS.toEDialect = function(writer) {
    writer.append('not contains');
};
EqOp.NOT_CONTAINS.toODialect = EqOp.NOT_CONTAINS.toEDialect;
EqOp.NOT_CONTAINS.toMDialect = EqOp.NOT_CONTAINS.toEDialect;
EqOp.NOT_CONTAINS.toEString = function() {
    return 'not contains';
};
EqOp.NOT_CONTAINS.toOString = EqOp.NOT_CONTAINS.toEString;
EqOp.NOT_CONTAINS.toMString = EqOp.NOT_CONTAINS.toEString;

exports.EqOp = EqOp;
