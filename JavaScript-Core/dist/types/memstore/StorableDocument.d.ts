import { StoredDocument } from './index';
import { IStorable } from '../store';
import IDbIdFactory from "../store/IDbIdFactory";
export default class StorableDocument implements IStorable {
    category: string[];
    document: StoredDocument | null;
    $dbIdFactory: IDbIdFactory | null;
    constructor(categories: string[], dbIdFactory: IDbIdFactory | null, document?: StoredDocument);
    isDirty(): boolean;
    clear(): void;
    getDbId(): any;
    getOrCreateDbId(): any;
    setDbId(dbId: any): void;
    hasData(name: string): boolean;
    getData(name: string): any;
    setData(name: string, value: any | null, dbId?: any | null): void;
}
