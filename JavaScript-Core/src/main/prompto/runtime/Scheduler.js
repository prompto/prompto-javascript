var ApplicationContext = require("./ApplicationContext").ApplicationContext;

function Scheduler() {
    return this;
}

Scheduler.lastJobId = 0;
Scheduler.timers = [];

Scheduler.schedule = function(method, executeAt, repeatEvery, jobName) {
    var runner = method.interpret ? function() { method.interpret(ApplicationContext.get()); } : method;
    var jobId = ++Scheduler.lastJobId;
    var delay = executeAt.date.valueOf() - (new Date()).valueOf();
    var timerTask = repeatEvery != null ? Scheduler.makeRepeatingTask(runner, jobId, repeatEvery) : Scheduler.makeSingleTask(runner, jobId);
    Scheduler.timers[jobId] = { id: setTimeout(timerTask, delay), cancel: function(id) { clearTimeout(id); } };
    return jobId;
};

Scheduler.makeSingleTask = function(runner, jobId) {
    return function() {
        try {
            runner();
        } finally {
            delete Scheduler.timers[jobId];
        }
    };
};

Scheduler.makeRepeatingTask = function(runner, jobId, repeatEvery) {
    return function() {
        try {
            runner();
        } finally {
            var interval = repeatEvery.totalMilliseconds(); // TODO
            Scheduler.timers[jobId] = { id: setInterval(function() {
                    runner();
            }, interval), cancel: function(id) { clearInterval(id); } };
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