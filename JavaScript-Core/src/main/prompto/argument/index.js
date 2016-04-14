exports.AttributeArgument = require("./AttributeArgument").AttributeArgument;
exports.CategoryArgument = require("./CategoryArgument").CategoryArgument;
exports.ExtendedArgument = require("./ExtendedArgument").ExtendedArgument;
exports.CodeArgument = require("./CodeArgument").CodeArgument;
exports.UnresolvedArgument = require("./UnresolvedArgument").UnresolvedArgument;

require("./ExtendedArgument").resolve();