export default interface IDbIdFactory {
    provider: null | (() => any);
    listener: null | ((dbId: any) => void)
}
