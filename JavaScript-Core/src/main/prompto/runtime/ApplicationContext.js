import { Context } from './index.js'

export default class ApplicationContext {
 
    static set(context) {
        const current = ApplicationContext.instance;
        ApplicationContext.instance = context;
        return current;
    }

    static get() {
        return ApplicationContext.instance;
    }

    static init() {
        return ApplicationContext.set(Context.newGlobalsContext());
    }
}

ApplicationContext.instance = null;

