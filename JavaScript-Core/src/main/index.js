exports.antlr4 = require('antlr4');
exports.prompto = require('./prompto');
/* global self, window */
const globals = global || window || self || this;
globals.antlr4 = exports.antlr4;
globals.prompto = exports.prompto;
