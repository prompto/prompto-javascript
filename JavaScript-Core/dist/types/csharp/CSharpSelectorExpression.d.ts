import CSharpExpression from './CSharpExpression';
export default abstract class CSharpSelectorExpression extends CSharpExpression {
    parent: CSharpExpression | null;
    constructor(parent?: CSharpExpression | null);
}
