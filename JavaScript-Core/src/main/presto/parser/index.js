exports.EParserListener = require("./EParserListener").EParserListener;
exports.OParserListener = require("./OParserListener").OParserListener;
exports.SParserListener = require("./SParserListener").SParserListener;
exports.EParser = require("./EParser").EParser;
exports.OParser = require("./OParser").OParser;
exports.SParser = require("./SParser").SParser;
exports.ECleverParser = require('./ECleverParser').ECleverParser;
exports.OCleverParser = require('./OCleverParser').OCleverParser;
exports.SCleverParser = require('./SCleverParser').SCleverParser;
exports.EPrestoBuilder = require("./EPrestoBuilder").EPrestoBuilder;
exports.OPrestoBuilder = require("./OPrestoBuilder").OPrestoBuilder;
exports.SPrestoBuilder = require("./SPrestoBuilder").SPrestoBuilder;
exports.Dialect = require("./Dialect").Dialect;
exports.Section = require("./Section").Section;

require("./ONamingLexer").resolve();
require("./Dialect").resolve();