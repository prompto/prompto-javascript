import { AnnotationProcessors } from "../processor";
import NodeLocator from "./NodeLocator.js";

export default class BaseSuggester {

    constructor(lexerClass, parser,  tree) {
        this.lexerClass = lexerClass;
        this.parser = parser;
        this.tree = tree;
    }

    caselessCompare(s1, s2) {
        const ls1 = s1.toLowerCase();
        const ls2 = s2.toLowerCase();
        return ls1 < ls2 ? -1 : (ls1 > ls2 ? 1 : (s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)));
    }

    enrichAnnotations(names) {
        const idx = names.indexOf("<arondbase>");
        if(idx < 0)
            return names;
        names.splice(idx, 1);
        return names.concat(AnnotationProcessors.names());
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
            stateNumber = this.getStartState();
        const atnState = this.parser._interp.atn.states[stateNumber];
        return this.parser.atn.nextTokens(atnState);
    }

    locateNodeBefore(caret) {
        const locator = new NodeLocator();
        return locator.locateNodeBefore(this.tree, caret);
    }

}

