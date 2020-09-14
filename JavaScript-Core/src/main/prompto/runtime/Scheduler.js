import { ApplicationContext } from "./index"

export default class Scheduler {
 
    static schedule(method, executeAt, repeatEvery, jobName) {
        const runner = method.interpret ? () => { method.interpret(ApplicationContext.get()); } : method;
        const jobId = ++Scheduler.lastJobId;
        const delay = executeAt.date.valueOf() - (new Date()).valueOf();
        const timerTask = repeatEvery != null ? Scheduler.makeRepeatingTask(runner, jobId, repeatEvery) : Scheduler.makeSingleTask(runner, jobId);
        Scheduler.timers[jobId] = { id: setTimeout(timerTask, delay), cancel: function(id) { clearTimeout(id); } };
        return jobId;
    }

    static makeSingleTask(runner, jobId) {
        return () => {
            try {
                runner();
            } finally {
                delete Scheduler.timers[jobId];
            }
        };
    }

    static makeRepeatingTask(runner, jobId, repeatEvery) {
        return () => {
            try {
                runner();
            } finally {
                const interval = repeatEvery.totalMilliseconds(); // TODO
                Scheduler.timers[jobId] = { id: setInterval(() => {
                        runner();
                }, interval), cancel: function(id) { clearInterval(id); } };
            }
        };
    }

    static cancel(jobId) {
      const timer = Scheduler.timers[jobId];
      if(!timer)
          console.log("Timer not found: " + jobId);
      else {
          delete Scheduler.timers[jobId];
          timer.cancel(timer.id);
      }
    }
}

Scheduler.lastJobId = 0;
Scheduler.timers = [];
