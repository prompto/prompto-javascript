import { MemStore } from '../memstore/index.js'

export default function $DataStore() {

}

$DataStore.instance = new MemStore();

