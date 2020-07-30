var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;
var Fiber = require('fibers');

/*
Fiber(function() {
    Out.init();
    BaseParserTest.coreContext = null;
    loadDependency("core");
    var savedContext = prompto.runtime.ApplicationContext.set(BaseParserTest.coreContext);
    runInterpretedTests('manual/scheduler.pec', { register: true, throws: true });
    Out.restore();
    prompto.runtime.ApplicationContext.set(savedContext);
}).run();
*/


Fiber(function() {
    Out.init();
    BaseParserTest.coreContext = null;
    loadDependency("core");
    var savedContext = prompto.runtime.ApplicationContext.set(BaseParserTest.coreContext);
    runTranspiledTests('manual/scheduler.pec', { register: true, throws: true });
    Out.restore();
    prompto.runtime.ApplicationContext.set(savedContext);
}).run();

