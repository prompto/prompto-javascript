import { IMethodDeclaration } from "../declaration";
import { DateTime, Period } from "../intrinsic";
interface Timer {
    id: any;
    cancel: (id: any) => void;
}
declare type Runnable = () => void;
export default class Scheduler {
    static lastJobId: number;
    static timers: Map<number, Timer>;
    static schedule(method: IMethodDeclaration | Runnable, executeAt: DateTime, repeatEvery: Period | null, jobName: string): number;
    static makeSingleTask(runner: Runnable, jobId: number): () => void;
    static makeRepeatingTask(runner: Runnable, jobId: number, repeatEvery: Period): () => void;
    static cancel(jobId: number): void;
}
export {};
