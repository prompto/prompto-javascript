function ContOp(name) {
    this.name = name;
    return this;
}

ContOp.prototype.toString = function() {
    return this.name.toLowerCase().replace('_', ' ');
};

ContOp.prototype.toDialect = function(writer) {
    writer.append(this.toString());
};

ContOp.IN = new ContOp("IN");
ContOp.HAS = new ContOp("HAS");
ContOp.HAS_ALL = new ContOp("HAS_ALL");
ContOp.HAS_ANY = new ContOp("HAS_ANY");
ContOp.NOT_IN = new ContOp("NOT_IN");
ContOp.NOT_HAS = new ContOp("NOT_HAS");
ContOp.NOT_HAS_ALL = new ContOp("NOT_HAS_ALL");
ContOp.NOT_HAS_ANY = new ContOp("NOT_HAS_ANY");

exports.ContOp = ContOp;
