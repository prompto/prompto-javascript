import CmdLineParser from './CmdLineParser.js';
import CodeWriter from './CodeWriter.js';
import { convertFromJavaScript, inferExpressionsType } from './TypeUtils.js';
import { getTypeName,
    isCharacterUpperCase, isABoolean, isACharacter, isADecimal, isAnInteger, isANumber, isAText, isAMethod, isInstanceOf,
    decimalToString, removeAccents, multiplyArray, convertToJson, convertToJsonNode,
    equalObjects, equalArrays, compareValues, arrayContains,
    stringToUtf8Buffer, getUtf8CharLength, utf8BufferToString } from './Utils.js';
import ImportUtils from './ImportUtils.js';
const importPathIfNode = ImportUtils.importPathIfNode;
const importFsIfNode = ImportUtils.importFsIfNode;

export { importPathIfNode, importFsIfNode,
    equalObjects, equalArrays, arrayContains, compareValues, isCharacterUpperCase,
    convertFromJavaScript, inferExpressionsType, getTypeName,
    isABoolean, isACharacter, isADecimal, isAnInteger, isANumber, isAText, isAMethod, isInstanceOf,
    decimalToString, removeAccents, multiplyArray, convertToJson, convertToJsonNode,
    stringToUtf8Buffer, utf8BufferToString, getUtf8CharLength,
    CodeWriter, CmdLineParser }
