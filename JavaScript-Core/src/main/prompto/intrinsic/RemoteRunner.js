/* dummy runner for syntax checking only */
function RemoteRunner() {}

RemoteRunner.execute = function(body, andThen, bindTo) {
    var result = body.bind(bindTo)();
    andThen.bind(bindTo)(result);
};

exports.RemoteRunner = RemoteRunner;