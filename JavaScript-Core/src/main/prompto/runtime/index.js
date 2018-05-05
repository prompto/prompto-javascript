exports.Context = require('./Context').Context;
exports.VoidResult = require('./VoidResult').VoidResult;
exports.MethodDeclarationMap  = require('./Context').MethodDeclarationMap;
exports.Interpreter = require('./Interpreter').Interpreter;
exports.Transpiler = require('./Transpiler').Transpiler;

require('./MethodFinder').resolve();
require('./ErrorVariable').resolve();