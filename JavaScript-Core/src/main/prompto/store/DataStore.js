import { MemStore } from '../memstore/index.js'

export default class $DataStore {

    static init() {
        $DataStore.instance = new MemStore();
    }
}

$DataStore.instance = null;
