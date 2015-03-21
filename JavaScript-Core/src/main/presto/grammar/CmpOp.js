function CmpOp() {
	return this;
}

CmpOp.GT = new CmpOp();
CmpOp.GT.toDialect = function(writer) {
    writer.append(">");
}

CmpOp.GTE = new CmpOp();
CmpOp.GTE.toDialect = function(writer) {
    writer.append(">=");
}

CmpOp.LT = new CmpOp();
CmpOp.LT.toDialect = function(writer) {
    writer.append("<");
}

CmpOp.LTE = new CmpOp();
CmpOp.LTE.toDialect = function(writer) {
    writer.append("<=");
}

exports.CmpOp = CmpOp;
