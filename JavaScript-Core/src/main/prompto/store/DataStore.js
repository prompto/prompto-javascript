import { MemStore } from '../memstore'

export default class $DataStore {

    static init() {
        $DataStore.instance = new MemStore();
    }
}

$DataStore.instance = null;
