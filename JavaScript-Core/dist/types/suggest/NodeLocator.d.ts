import { ParserRuleContext, ParseTree, TerminalNode, Token } from "antlr4";
import Caret from "./Caret";
export default class NodeLocator {
    locateNodeBefore(tree: ParseTree, caret: Caret): ParserRuleContext | null;
    _locateNodeBefore(tree: ParseTree, caret: Caret): ParserRuleContext | null;
    _locateNodeBeforeTerminal(node: TerminalNode, caret: Caret): ParserRuleContext | null;
    _locateNodeBeforeRule(rule: ParserRuleContext, caret: Caret): ParserRuleContext | null;
    _checkTokenBefore(token: Token, caret: Caret): void;
}
