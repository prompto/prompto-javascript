function execute(body, andThen) {
    body();
    andThen();
};

exports.execute = execute;