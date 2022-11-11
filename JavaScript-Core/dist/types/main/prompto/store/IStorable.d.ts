export default interface IStorable {
    getOrCreateDbId(): any;
    isDirty(): boolean;
    setData(name: string, storableData: any, dbId: any): void;
}
