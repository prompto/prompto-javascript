var Context = require("./Context").Context;
var instance = null;


function ApplicationContext() {
    return this;
}


ApplicationContext.set = function(context) {
    var current = instance;
    instance = context;
    return current;
};


ApplicationContext.get = function() {
    return instance;
};


ApplicationContext.init = function() {
    return ApplicationContext.set(Context.newGlobalsContext());
};


exports.ApplicationContext = ApplicationContext;
