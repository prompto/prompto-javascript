import NativeInstance from './NativeInstance';
import { Context } from "../runtime";
import { NativeResourceDeclaration } from "../declaration";
import { IResource } from "./index";
export default class NativeResource extends NativeInstance implements IResource {
    constructor(context: Context, declaration: NativeResourceDeclaration, instance?: any);
    get resource(): IResource;
    isReadable(): boolean;
    isWritable(): boolean;
    readBinary(): import("../intrinsic/Binary").default;
    readFully(): string;
    writeFully(data: string, callback?: (s: string) => void): void;
    readLine(): string;
    writeLine(data: string): void;
    close(): void;
}
