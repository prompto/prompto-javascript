import antlr4 from "antlr4";
import Caret from "./Caret";

export default class NodeLocator {

    locateNodeBefore(tree: antlr4.tree.ParseTree, caret: Caret): antlr4.context.ParserRuleContext | null {
        try {
            return this._locateNodeBefore(tree, caret);
        } catch(e) {
            return null;
        }
    }

    _locateNodeBefore(tree: antlr4.tree.ParseTree, caret: Caret): antlr4.context.ParserRuleContext | null {
        if (tree instanceof antlr4.context.ParserRuleContext)
            return this._locateNodeBeforeRule(tree, caret);
        else if (tree instanceof antlr4.tree.TerminalNode)
            return this._locateNodeBeforeTerminal(tree, caret);
        else
            throw new Error("unsupported");
    }

    _locateNodeBeforeTerminal(node: antlr4.tree.TerminalNode, caret: Caret): antlr4.context.ParserRuleContext | null {
        this._checkTokenBefore(node.symbol, caret);
        return node.parentCtx;
     }

     _locateNodeBeforeRule(rule: antlr4.context.ParserRuleContext, caret: Caret): antlr4.context.ParserRuleContext | null {
        this._checkTokenBefore(rule.start, caret);
        let nodeBefore = rule;
        if (rule.children) {
            for (let i = 0; i < rule.children.length; i++) {
                const locator = new NodeLocator();
                const node = locator.locateNodeBefore(rule.children[i], caret);
                if (node)
                    nodeBefore = node;
            }
        }
        return nodeBefore;
    }

    _checkTokenBefore(token: antlr4.Token, caret: Caret) {
        if(token.line > caret.line || (token.line == caret.line && token.column >= caret.column - 1))
            throw new Error("after caret");
    }

}
