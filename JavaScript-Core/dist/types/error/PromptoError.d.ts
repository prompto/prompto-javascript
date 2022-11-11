export default abstract class PromptoError {

    error: Error;
    name: string;

    constructor(...args: any[]);
    get message(): string;
    get stack(): string;

}
