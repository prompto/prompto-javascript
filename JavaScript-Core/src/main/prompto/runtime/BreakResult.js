function BreakResult() {
    return this;
}

BreakResult.instance = new BreakResult();

exports.BreakResult = BreakResult;