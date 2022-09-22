import SymbolList from './SymbolList'
import {NativeSymbol} from "../expression";

export default class NativeSymbolList extends SymbolList<NativeSymbol> {

    constructor(symbols?: NativeSymbol[], symbol?: NativeSymbol) {
        super(symbols, symbol);
    }
}
