import Store from './Store';
import { MemStore } from '../memstore';

export default class $DataStore {

    static instance: Store = new MemStore();
}
