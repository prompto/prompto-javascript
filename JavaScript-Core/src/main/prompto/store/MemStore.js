var InternalError = require("../error/InternalError").InternalError;
var Bool = require("../value/Bool").Bool;

// a utility class for running unit tests only
function MemStore(object) {
    this.instances = {};
    return this;
}

MemStore.prototype.store = function(document) {
    this.instances[document] = document;
};


MemStore.prototype.fetchOne = function(context, xfilter) {
    for (doc in this.instances) {
        doc = this.instances[doc];
        var local = context.newDocumentContext(doc);
        var test = xfilter.interpret(local);
        if (!(test instanceof Bool))
            throw new InternalError("Illegal test result: " + test);
        if (test.value)
            return doc;
    }
    return null;
};

MemStore.instance = new MemStore ();

exports.MemStore = MemStore;