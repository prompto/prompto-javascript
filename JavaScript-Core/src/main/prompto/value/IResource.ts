import Binary from "../intrinsic/Binary";

export default interface IResource {
    isWritable(): boolean;
    writeLine(s: string): void;
    writeFully(str: string, callback?: (s: string) => void): void;
    isReadable(): boolean;
    readBinary(): Binary;
    readFully(): string;
    readLine(): string;
    close(): void;

}
