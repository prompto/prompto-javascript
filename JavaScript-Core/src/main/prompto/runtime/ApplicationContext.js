const Context = require("./Context").Context;
let instance = null;


class ApplicationContext {
 
    static set(context) {
        const current = instance;
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
