const MemStore = require("../memstore/MemStore").MemStore;

function $DataStore() {

}

$DataStore.instance = new MemStore();

exports.$DataStore = $DataStore;
