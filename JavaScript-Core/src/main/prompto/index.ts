import * as parser from './parser';
import * as constraint from '../../main/prompto/constraint';
import * as csharp from '../../main/prompto/csharp';
import * as declaration from '../../main/prompto/declaration';
import * as error from '../../main/prompto/error';
import * as expression from '../../main/prompto/expression';
import * as grammar from '../../main/prompto/grammar';
import * as instance from '../../main/prompto/instance';
import * as intrinsic from '../../main/prompto/intrinsic';
import * as java from '../../main/prompto/java';
import * as jsx from '../../main/prompto/jsx';
import * as literal from '../../main/prompto/literal';
import * as memstore from '../../main/prompto/memstore';
import * as param from '../../main/prompto/param';
import * as problem from '../../main/prompto/problem';
import * as runtime from '../../main/prompto/runtime';
import * as statement from '../../main/prompto/statement';
import * as store from '../../main/prompto/store';
import * as suggest from '../../main/prompto/suggest';
import * as type from '../../main/prompto/type';
import * as value from '../../main/prompto/value';
import * as utils from '../../main/prompto/utils';

export default { constraint, csharp, declaration, error, expression, grammar, instance, intrinsic, java, jsx, literal, store, memstore, param, parser, problem, runtime, statement, suggest, type, utils, value };

import initAll from "./init.js"
initAll();
