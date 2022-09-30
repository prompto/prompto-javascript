import { ApplicationContext } from '../runtime'
import {BaseMethodDeclaration, IMethodDeclaration} from "../declaration";
import {DateTime, Period} from "../intrinsic";

interface Timer {
    id: any;
    cancel: (id: any) => void;
}

type Runnable = () => void;

export default class Scheduler {

    static lastJobId = 0;
    static timers = new Map<number, Timer>();

    static schedule(method: IMethodDeclaration | Runnable, executeAt: DateTime, repeatEvery: Period | null, jobName: string) {
        const runnable: Runnable = method instanceof BaseMethodDeclaration ? () => { method.interpret(ApplicationContext.get()); } : method as Runnable;
        const jobId = ++Scheduler.lastJobId;
        const delay = executeAt.date.valueOf() - (new Date()).valueOf();
        const timerTask = repeatEvery != null ? Scheduler.makeRepeatingTask(runnable, jobId, repeatEvery) : Scheduler.makeSingleTask(runnable, jobId);
        Scheduler.timers.set(jobId, { id: setTimeout(timerTask, delay), cancel: (id: any) => clearTimeout(id as number) });
        return jobId;
    }

    static makeSingleTask(runner: Runnable, jobId: number) {
        return () => {
            try {
                runner();
            } finally {
                Scheduler.timers.delete(jobId);
            }
        };
    }

    static makeRepeatingTask(runner: Runnable, jobId: number, repeatEvery: Period) {
        return () => {
            try {
                runner();
            } finally {
                const interval = repeatEvery.totalMilliseconds(); // TODO
                Scheduler.timers.set(jobId, { id: setInterval(() => runner(), interval), cancel: id => clearInterval(id as number) });
            }
        };
    }

    static cancel(jobId: number) {
      const timer = Scheduler.timers.get(jobId);
      if(!timer)
          console.log("Timer not found: " + String(jobId));
      else {
          Scheduler.timers.delete(jobId);
          timer.cancel(timer.id);
      }
    }
}
