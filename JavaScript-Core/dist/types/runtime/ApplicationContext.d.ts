import { Context } from './index';
export default class ApplicationContext {
    static instance: Context | null;
    static set(context: Context): Context;
    static get(): Context;
    static init(): Context;
}
