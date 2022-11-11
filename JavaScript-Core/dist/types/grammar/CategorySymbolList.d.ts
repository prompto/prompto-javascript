import SymbolList from './SymbolList';
import { CategorySymbol } from "../expression";
export default class CategorySymbolList extends SymbolList<CategorySymbol> {
    constructor(symbols?: CategorySymbol[], symbol?: CategorySymbol);
}
