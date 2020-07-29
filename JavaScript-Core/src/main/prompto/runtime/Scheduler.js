var ApplicationContext = require("./ApplicationContext").ApplicationContext;

function Scheduler() {
    return this;
}

Scheduler.lastJobId = 0;
Scheduler.timers = [];

Scheduler.schedule = function(method, executeAt, repeatEvery, jobName) {
    var jobId = ++Scheduler.lastJobId;
    var delay = executeAt.date.valueOf() - (new Date()).valueOf();
    var timerTask = repeatEvery != null ? Scheduler.makeRepeatingTask(method, jobId, repeatEvery) : Scheduler.makeSingleTask(method, jobId);
    Scheduler.timers[jobId] = { id: setTimeout(timerTask, delay), cancel: clearTimeout };
    return jobId;
};

Scheduler.makeSingleTask = function(method, jobId) {
    return function() {
        try {
            method.interpret(ApplicationContext.get());
        } finally {
            delete Scheduler.timers[jobId];
        }
    };
};

Scheduler.makeRepeatingTask = function(method, jobId, repeatEvery) {
    return function() {
        try {
            method.interpret(ApplicationContext.get());
        } finally {
            var interval = repeatEvery.totalMilliseconds(); // TODO
            Scheduler.timers[jobId] = { id: setInterval(function() {
                method.interpret(ApplicationContext.get());
            }, interval), cancel: clearInterval };
        }
    };
};

Scheduler.cancel = function(jobId) {
  var timer = Scheduler.timers[jobId];
  if(!timer)
      console.log("Timer not found: " + jobId);
  else {
      delete Scheduler.timers[jobId];
      timer.cancel(timer.id);
  }
};

exports.Scheduler = Scheduler;