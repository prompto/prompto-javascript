var MemStoreModule = require("./src/main/prompto/memstore/MemStore");
MemStoreModule.Cursor = Cursor;
$DataStore.instance = new MemStoreModule.MemStore();
main$Text_dict();