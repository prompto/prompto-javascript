var Context = require("./Context").Context;
var instance = null;


class ApplicationContext {
 
    static set(context) {
        var current = instance;
        instance = context;
        return current;
    }

    static get() {
        return instance;
    }

    static init() {
        return ApplicationContext.set(Context.newGlobalsContext());
    }
}


exports.ApplicationContext = ApplicationContext;
