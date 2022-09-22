import antlr4 from 'antlr4';
import prompto from './prompto';
/* global self, window */
const globals = global || window || self || this;
// @ts-ignore
globals.antlr4 = antlr4;
// @ts-ignore
globals.prompto = prompto;
