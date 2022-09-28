export default interface IStored {
    dbId: any;
    hasData(name: string): boolean;
    getData<T>(name: string): T;
}
