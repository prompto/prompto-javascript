exports.EParserListener = require("./EParserListener").EParserListener;
exports.OParserListener = require("./OParserListener").OParserListener;
exports.PParserListener = require("./PParserListener").PParserListener;
exports.EParser = require("./EParser").EParser;
exports.OParser = require("./OParser").OParser;
exports.PParser = require("./PParser").PParser;
exports.ECleverParser = require('./ECleverParser').ECleverParser;
exports.OCleverParser = require('./OCleverParser').OCleverParser;
exports.PCleverParser = require('./PCleverParser').PCleverParser;
exports.EPrestoBuilder = require("./EPrestoBuilder").EPrestoBuilder;
exports.OPrestoBuilder = require("./OPrestoBuilder").OPrestoBuilder;
exports.PPrestoBuilder = require("./PPrestoBuilder").PPrestoBuilder;
exports.Dialect = require("./Dialect").Dialect;
exports.Section = require("./Section").Section;

require("./ONamingLexer").resolve();
require("./Dialect").resolve();