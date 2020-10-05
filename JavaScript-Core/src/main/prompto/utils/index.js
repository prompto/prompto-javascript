import CmdLineParser from './CmdLineParser.js';
import CodeWriter from './CodeWriter.js';
import { convertFromJavaScript, inferExpressionsType, inferElementType } from './TypeUtils.js';
import { getTypeName,
    isCharacterUpperCase, isABoolean, isACharacter, isADecimal, isAnInteger, isAText,
    decimalToString, removeAccents, multiplyArray,
    equalObjects, equalArrays, compareValues, arrayContains,
    stringToUtf8Buffer, getUtf8CharLength, utf8BufferToString } from './Utils.js';
import ImportUtils from './ImportUtils.js';
const importPathIfNode = ImportUtils.importPathIfNode;
const importFsIfNode = ImportUtils.importFsIfNode;

export { importPathIfNode, importFsIfNode,
    equalObjects, equalArrays, arrayContains, compareValues, isCharacterUpperCase,
    inferExpressionsType, inferElementType, getTypeName,
    isABoolean, isACharacter, isADecimal, isAnInteger, isAText,
    decimalToString, removeAccents, multiplyArray,
    stringToUtf8Buffer, utf8BufferToString, getUtf8CharLength,
    convertFromJavaScript, CodeWriter, CmdLineParser }