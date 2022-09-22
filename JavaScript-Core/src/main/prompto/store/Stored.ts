export default interface Stored {
    dbId: never;
    hasData(name: string): boolean;
    getData(name: string): any;
}
