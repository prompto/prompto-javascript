class CmpOp {
    constructor() {
        return this;
    }

    toDialect(writer) {
        writer.append(this.toString());
    }
}


CmpOp.GT = new CmpOp();
CmpOp.GT.toString = function() {
    return ">";
};
CmpOp.GT.transpile = function(transpiler) {
    transpiler.append("gt");
};

CmpOp.GTE = new CmpOp();
CmpOp.GTE.toString = function() {
    return ">=";
};
CmpOp.GTE.transpile = function(transpiler) {
    transpiler.append("gte");
};


CmpOp.LT = new CmpOp();
CmpOp.LT.toString = function() {
    return "<";
};
CmpOp.LT.transpile = function(transpiler) {
    transpiler.append("lt");
};

CmpOp.LTE = new CmpOp();
CmpOp.LTE.toString = function() {
    return "<=";
};
CmpOp.LTE.transpile = function(transpiler) {
    transpiler.append("lte");
};

exports.CmpOp = CmpOp;
