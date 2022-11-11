import JavaScriptExpression from './JavaScriptExpression';
export default abstract class JavaScriptSelectorExpression extends JavaScriptExpression {
    parent: JavaScriptExpression | null;
    constructor(parent: JavaScriptExpression | null);
}
