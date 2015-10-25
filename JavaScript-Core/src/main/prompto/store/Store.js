var MemStore = require("./MemStore").MemStore;

function Store() {

}

Store.instance = new MemStore();

exports.Store = Store;

