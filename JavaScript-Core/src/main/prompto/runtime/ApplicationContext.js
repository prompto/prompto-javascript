var Context = require("./Context").Context;
var instance = null;

function ApplicationContext() {

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