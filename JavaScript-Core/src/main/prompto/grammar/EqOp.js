export default class EqOp {

    constructor(name) {
        this.name = name
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toString(dialect) {
        if(dialect)
            return dialect.toString(this);
        else
            return this.name;
    }
}

EqOp.IS = new EqOp("IS");
EqOp.IS.toDialect = writer => {
    writer.append('is');
};
EqOp.IS.toEString = () => 'is';
EqOp.IS.toOString = EqOp.IS.toEString;
EqOp.IS.toMString = EqOp.IS.toEString;

EqOp.IS_NOT = new EqOp("IS_NOT");
EqOp.IS_NOT.toDialect = writer => {
    writer.append('is not');
};
EqOp.IS_NOT.toEString = () => 'is not';
EqOp.IS_NOT.toOString = EqOp.IS_NOT.toEString;
EqOp.IS_NOT.toMString = EqOp.IS_NOT.toEString;


EqOp.IS_A = new EqOp("IS_A");
EqOp.IS_A.toDialect = writer => {
    writer.append('is a');
};
EqOp.IS_A.toEString = () => 'is a';
EqOp.IS_A.toOString = EqOp.IS_A.toEString;
EqOp.IS_A.toMString = EqOp.IS_A.toEString;

EqOp.IS_NOT_A = new EqOp("IS_NOT_A");
EqOp.IS_NOT_A.toDialect = writer => {
    writer.append('is not a');
};
EqOp.IS_NOT_A.toEString = dialect => 'is not a';
EqOp.IS_NOT_A.toOString = EqOp.IS_NOT_A.toEString;
EqOp.IS_NOT_A.toMString = EqOp.IS_NOT_A.toEString;

EqOp.EQUALS = new EqOp("EQUALS");
EqOp.EQUALS.toEDialect = writer => {
    writer.append('=');
};
EqOp.EQUALS.toODialect = writer => {
    writer.append('==');
};
EqOp.EQUALS.toMDialect = writer => {
    writer.append('==');
};
EqOp.EQUALS.toEString = () => '=';
EqOp.EQUALS.toOString = () => '==';
EqOp.EQUALS.toMString = () => '==';

EqOp.NOT_EQUALS = new EqOp("NOT_EQUALS");
EqOp.NOT_EQUALS.toEDialect = writer => {
    writer.append('<>');
};
EqOp.NOT_EQUALS.toODialect = writer => {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toMDialect = writer => {
    writer.append('!=');
};
EqOp.NOT_EQUALS.toEString = () => '<>';
EqOp.NOT_EQUALS.toOString = () => '!=';
EqOp.NOT_EQUALS.toMString = () => '!=';

EqOp.ROUGHLY = new EqOp("ROUGHLY");
EqOp.ROUGHLY.toEDialect = writer => {
    writer.append('~');
};
EqOp.ROUGHLY.toODialect = writer => {
    writer.append('~=');
};
EqOp.ROUGHLY.toMDialect = writer => {
    writer.append('~=');
};
EqOp.ROUGHLY.toEString = () => '~';
EqOp.ROUGHLY.toOString = () => '~=';
EqOp.ROUGHLY.toMString = () => '~=';

EqOp.CONTAINS = new EqOp("CONTAINS");
EqOp.CONTAINS.toEDialect = writer => {
    writer.append('contains');
};
EqOp.CONTAINS.toODialect = EqOp.CONTAINS.toEDialect;
EqOp.CONTAINS.toMDialect = EqOp.CONTAINS.toEDialect;
EqOp.CONTAINS.toEString = () => 'contains';
EqOp.CONTAINS.toOString = EqOp.CONTAINS.toEString;
EqOp.CONTAINS.toMString = EqOp.CONTAINS.toEString;

EqOp.NOT_CONTAINS = new EqOp("NOT_CONTAINS");
EqOp.NOT_CONTAINS.toEDialect = writer => {
    writer.append('not contains');
};
EqOp.NOT_CONTAINS.toODialect = EqOp.NOT_CONTAINS.toEDialect;
EqOp.NOT_CONTAINS.toMDialect = EqOp.NOT_CONTAINS.toEDialect;
EqOp.NOT_CONTAINS.toEString = () => 'not contains';
EqOp.NOT_CONTAINS.toOString = EqOp.NOT_CONTAINS.toEString;
EqOp.NOT_CONTAINS.toMString = EqOp.NOT_CONTAINS.toEString;
