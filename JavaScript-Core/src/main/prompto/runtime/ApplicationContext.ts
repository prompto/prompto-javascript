import { Context } from './index'

export default class ApplicationContext {

    static instance: Context | null = null;

    static set(context: Context) {
        const current = ApplicationContext.instance;
        ApplicationContext.instance = context;
        return current;
    }

    static get() {
        return ApplicationContext.instance!;
    }

    static init() {
        return ApplicationContext.set(Context.newGlobalsContext());
    }
}


