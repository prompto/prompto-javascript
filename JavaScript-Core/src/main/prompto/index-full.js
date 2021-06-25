import * as parser from './parser/index.js';
import * as constraint from './constraint/index.js';
import * as csharp from './csharp/index.js';
import * as declaration from './declaration/index.js';
import * as error from './error/index.js';
import * as expression from './expression/index.js';
import * as grammar from './grammar/index.js';
import * as instance from './instance/index.js';
import * as intrinsic from './intrinsic/index.js';
import * as java from './java/index.js';
import * as jsx from './jsx/index.js';
import * as literal from './literal/index.js';
import * as memstore from './memstore/index.js';
import * as param from './param/index.js';
import * as problem from './problem/index.js';
import * as runtime from './runtime/index.js';
import * as statement from './statement/index.js';
import * as store from './store/index.js';
import * as suggest from './suggest/index.js';
import * as type from './type/index.js';
import * as value from './value/index.js';

import * as utils_core from './utils/index.js';
import * as utils_runtime from '../../../../JavaScript-Runtime/src/main/prompto/utils/index.js';
const utils = Object.assign({}, utils_core, utils_runtime);

import * as internet from '../../../../JavaScript-Runtime/src/main/prompto/internet/index.js';
import * as io from '../../../../JavaScript-Runtime/src/main/prompto/io/index.js';
import * as path from '../../../../JavaScript-Runtime/src/main/prompto/path/index.js';
import * as reader from '../../../../JavaScript-Runtime/src/main/prompto/reader/index.js';
import * as writer from '../../../../JavaScript-Runtime/src/main/prompto/writer/index.js';

export { constraint, csharp, declaration, error, expression, grammar, instance, intrinsic, java, jsx, literal, store,
    memstore, param, parser, problem, runtime, statement, suggest, type, utils, value, internet, io, path, reader, writer };

import initAll from "./init.js"
initAll();

