import JavaExpression from './JavaExpression';
export default abstract class JavaSelectorExpression extends JavaExpression {
    parent: JavaExpression | null;
    constructor(parent: JavaExpression | null);
}
