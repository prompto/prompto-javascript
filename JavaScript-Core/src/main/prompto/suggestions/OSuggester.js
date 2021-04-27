import antlr4 from 'antlr4';
import { AnnotationProcessors } from "../processor/index.js";

class NodeLocator {

    locateNodeBefore(tree, caret) {
        this.nodeBefore = null;
        try {
            this._locateNodeBefore(tree, caret);
        } catch(e) {
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
            else
                this.nodeBefore = tree;
        }
   }

}


export default class OSuggester {

    constructor(lexerClass, parser,  tree) {
        this.lexerClass = lexerClass;
        this.parser = parser;
        this.tree = tree;
    }

    suggestionsAt(caret, context) {
        const node = this.locateNodeBefore(caret);
        const intervalSet = this.expectedTokenIntervalsAfter(node);
        const tokens = this.flattenTokenIntervals(intervalSet.intervals);
        const visible = tokens.filter(this.filterVisible, this);
        const stringified = visible.map(this.stringify, this);
        const enriched = this.enrich(stringified, context);
        enriched.sort(this.caselessCompare);
        return enriched;
    }

    caselessCompare(s1, s2) {
        const ls1 = s1.toLowerCase();
        const ls2 = s2.toLowerCase();
        return ls1 < ls2 ? -1 : (ls1 > ls2 ? 1 : (s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)));
    }

    enrich(stringified, context) {
        stringified = this.enrichAnnotations(stringified);
        return stringified;
    }

    enrichAnnotations(stringified) {
        const idx = stringified.indexOf("<arondbase>");
        if(idx < 0)
            return stringified;
        stringified.splice(idx, 1);
        return stringified.concat(AnnotationProcessors.names());
    }

    stringify(token) {
        const name = this.lexerClass.literalNames[token];
        if(name && name.startsWith("'"))
            return name.substring(1, name.length - 1);
        const symName = this.lexerClass.symbolicNames[token];
        return "<" + symName.substring(0, symName.indexOf("_")).toLowerCase() + ">";
    }

    filterVisible(token) {
        if(this.lexerClass.literalNames[token])
            return true;
        const symName = this.lexerClass.symbolicNames[token];
        return symName && (symName.endsWith("_LITERAL") || symName.endsWith("_IDENTIFIER"));
    }

    flattenTokenIntervals(intervals) {
        return intervals.flatMap(this.intervalToTokenArray);
    }

    intervalToTokenArray(interval) {
        const result = [];
        for(let t = interval.start; t < interval.stop; t++)
            result.push(t);
        return result;
    }

    expectedTokenIntervalsAfter(node) {
        let stateNumber = node.invokingState;
        if(stateNumber === -1)
            stateNumber = 152; // first state in OParser.declaration_list()
        const atnState = this.parser._interp.atn.states[stateNumber];
        return this.parser.atn.nextTokens(atnState);
    }

    locateNodeBefore(caret) {
        const locator = new NodeLocator();
        return locator.locateNodeBefore(this.tree, caret);
    }
}