export default interface IStored {
    dbId: never;
    hasData(name: string): boolean;
    getData(name: string): any;
}
