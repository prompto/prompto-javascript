import Binary from "../intrinsic/Binary";

export default interface IResource {
    isReadable(): boolean;
    readBinary(): Binary;
    readFully(): string;
    readLine(): string;
    close(): void;
}
