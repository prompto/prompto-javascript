export default interface IStored {
    dbId: never;
    hasData(name: string): boolean;
    getData<T>(name: string): T;
}
