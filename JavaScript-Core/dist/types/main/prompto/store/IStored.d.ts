export default interface IStored {
    dbId: any;
    category: string[];
    hasData(name: string): boolean;
    getData<T>(name: string): T;
}
