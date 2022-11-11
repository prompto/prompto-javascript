import BaseSuggester from "./BaseSuggester";
import { OLexer } from "../parser";
import { Context } from "../runtime";
export default class OSuggester extends BaseSuggester<OLexer> {
    static TYPE_IDENTIFIER_TOKENS: Set<number>;
    getStartState(): number;
    deduplicate_type(tokens: number[], context: Context): number[];
}
