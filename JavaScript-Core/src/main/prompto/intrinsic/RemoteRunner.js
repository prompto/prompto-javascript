/* dummy runner for syntax checking only */
export default function RemoteRunner() {}

RemoteRunner.run = function(body, andThen, bindTo) {
    var result = body.bind(bindTo)();
    andThen.bind(bindTo)(result);
};
