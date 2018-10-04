var MemStore = require("../memstore/MemStore").MemStore;

var DataStore = {
    instance: new MemStore()
};

exports.DataStore = DataStore;
