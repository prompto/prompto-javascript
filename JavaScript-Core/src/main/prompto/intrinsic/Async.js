function execute(body, andThen) {
    var result = body();
    andThen(result);
};

exports.execute = execute;