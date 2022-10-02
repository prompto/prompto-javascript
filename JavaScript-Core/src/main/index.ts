import antlr4 from 'antlr4';
import prompto from './prompto';
/* global self, window */
const globals = global || window || self || this;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globals.antlr4 = antlr4;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globals.prompto = prompto;
