export default class CmpOp {

    toDialect(writer: CodeWriter): void {
        writer.append(this.toString());
    }
}


CmpOp.GT = new CmpOp();
CmpOp.GT.toString = () => ">";
CmpOp.GT.transpile = transpiler => {
    transpiler.append("gt");
};

CmpOp.GTE = new CmpOp();
CmpOp.GTE.toString = () => ">=";
CmpOp.GTE.transpile = transpiler => {
    transpiler.append("gte");
};


CmpOp.LT = new CmpOp();
CmpOp.LT.toString = () => "<";
CmpOp.LT.transpile = transpiler => {
    transpiler.append("lt");
};

CmpOp.LTE = new CmpOp();
CmpOp.LTE.toString = () => "<=";
CmpOp.LTE.transpile = transpiler => {
    transpiler.append("lte");
};
