import antlr4 from "antlr4";

export default class NodeLocator {

    locateNodeBefore(tree, caret) {
        this.nodeBefore = null;
        try {
            this._locateNodeBefore(tree, caret);
        } catch(e) {
            return tree;
        }
        return this.nodeBefore || tree;
    }

    _locateNodeBefore(tree, caret) {
        if (tree instanceof antlr4.ParserRuleContext) {
            this._checkTokenBefore(tree.start, caret);
            if (tree.children) {
                for (let i = 0; i < tree.children.length; i++) {
                    const locator = new NodeLocator();
                    const node = locator.locateNodeBefore(tree.children[i], caret);
                    if (node)
                        this.nodeBefore = node;
                }
            }
        } else if (tree instanceof antlr4.TerminalNode) {
            this._checkTokenBefore(tree.symbol, caret);
            this.nodeBefore = tree.parentCtx;
        }
    }

    _checkTokenBefore(token, caret) {
        if (token instanceof antlr4.CommonToken) {
            if(token.line > caret.line || (token.line === caret.line && token.column >= caret.column - 1))
                throw new Error("after caret");
        }
    }

}
