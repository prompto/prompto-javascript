import MemStore from "./src/main/prompto/memstore/MemStore.js"
import DataStore from "./src/main/prompto/store/DataStore.js"

MemStore.Cursor = Cursor;
DataStore.instance = $DataStore.instance = new MemStore();

main$Text_dict();