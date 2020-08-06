class CmpOp {
    constructor() {
        return this;
    }

    toDialect(writer) {
        writer.append(this.toString());
    }
}


CmpOp.GT = new CmpOp();
CmpOp.GT.toString = () => {
    return ">";
};
CmpOp.GT.transpile = transpiler => {
    transpiler.append("gt");
};

CmpOp.GTE = new CmpOp();
CmpOp.GTE.toString = () => {
    return ">=";
};
CmpOp.GTE.transpile = transpiler => {
    transpiler.append("gte");
};


CmpOp.LT = new CmpOp();
CmpOp.LT.toString = () => {
    return "<";
};
CmpOp.LT.transpile = transpiler => {
    transpiler.append("lt");
};

CmpOp.LTE = new CmpOp();
CmpOp.LTE.toString = () => {
    return "<=";
};
CmpOp.LTE.transpile = transpiler => {
    transpiler.append("lte");
};

exports.CmpOp = CmpOp;
