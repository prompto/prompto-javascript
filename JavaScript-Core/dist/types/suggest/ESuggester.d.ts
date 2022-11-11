import BaseSuggester from "./BaseSuggester";
import { ELexer } from "../parser";
import { Context } from "../runtime";
export default class ESuggester extends BaseSuggester<ELexer> {
    static TYPE_IDENTIFIER_TOKENS: Set<number>;
    getStartState(): number;
    deduplicate_type(tokens: number[], context: Context): number[];
}
