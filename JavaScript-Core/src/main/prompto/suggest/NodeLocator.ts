import {ParserRuleContext, ParseTree, TerminalNode, Token} from "antlr4";
import Caret from "./Caret";

export default class NodeLocator {

    locateNodeBefore(tree: ParseTree, caret: Caret): ParserRuleContext | null {
        try {
            return this._locateNodeBefore(tree, caret);
        } catch(e) {
            return null;
        }
    }

    _locateNodeBefore(tree: ParseTree, caret: Caret): ParserRuleContext | null {
        if (tree instanceof ParserRuleContext)
            return this._locateNodeBeforeRule(tree, caret);
        else if (tree instanceof TerminalNode)
            return this._locateNodeBeforeTerminal(tree, caret);
        else
            throw new Error("unsupported");
    }

    _locateNodeBeforeTerminal(node: TerminalNode, caret: Caret): ParserRuleContext | null {
        this._checkTokenBefore(node.symbol, caret);
        return node.parentCtx;
     }

     _locateNodeBeforeRule(rule: ParserRuleContext, caret: Caret): ParserRuleContext | null {
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

    _checkTokenBefore(token: Token, caret: Caret) {
        if(token.line > caret.line || (token.line == caret.line && token.column >= caret.column - 1))
            throw new Error("after caret");
    }

}
