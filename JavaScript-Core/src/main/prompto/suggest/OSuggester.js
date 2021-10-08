import BaseSuggester from "./BaseSuggester.js";
import { OLexer } from "../parser/index.js";


export default class OSuggester extends BaseSuggester {

    getStartState() {
        return 152; // first state in OParser.declaration_list()
    }

    suggestionsAt(caret, context) {
        const node = this.locateNodeBefore(caret);
        const intervalSet = this.expectedTokenIntervalsAfter(node);
        const tokens = this.flattenTokenIntervals(intervalSet.intervals);
        const deduped = this.deduplicate(tokens, context);
        const visible = deduped.filter(this.filterVisible, this);
        const stringified = visible.map(this.stringify, this);
        const enriched = this.enrich(stringified, context);
        enriched.sort(this.caselessCompare);
        return enriched;
    }

    deduplicate(tokens, context) {
        tokens = this.deduplicate_type(tokens, context);
        return tokens;
    }

    static TYPE_IDENTIFIER_TOKENS = new Set([
        OLexer.DBID,
        OLexer.ANY,
        OLexer.BOOLEAN,
        OLexer.BLOB,
        OLexer.CHARACTER,
        OLexer.CODE,
        OLexer.CSS,
        OLexer.CURSOR,
        OLexer.DATE,
        OLexer.DATETIME,
        OLexer.DECIMAL,
        OLexer.DOCUMENT,
        OLexer.HTML,
        OLexer.IMAGE,
        OLexer.INTEGER,
        OLexer.ITERATOR,
        OLexer.PERIOD,
        OLexer.TEXT,
        OLexer.TIME,
        OLexer.UUID,
        OLexer.VERSION,
        OLexer.TYPE
    ]);

    deduplicate_type(tokens, context) {
        if(tokens.indexOf(OLexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !OSuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

    enrich(names, context) {
        names = this.enrichAnnotations(names);
        return names;
    }

}