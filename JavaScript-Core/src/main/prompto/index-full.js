import * as parser from './parser';
import * as constraint from './constraint';
import * as csharp from './csharp';
import * as declaration from '../../main/prompto/declaration';
import * as error from './error';
import * as expression from './expression';
import * as grammar from './grammar';
import * as instance from './instance';
import * as intrinsic from './intrinsic';
import * as java from './java';
import * as jsx from './jsx';
import * as literal from './literal';
import * as memstore from './memstore';
import * as param from './param';
import * as problem from './problem';
import * as runtime from '../../main/prompto/runtime';
import * as statement from '../../main/prompto/statement';
import * as store from './store';
import * as suggest from './suggest';
import * as type from '../../main/prompto/type';
import * as value from './value';

import * as utils_core from '../../main/prompto/utils';
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

