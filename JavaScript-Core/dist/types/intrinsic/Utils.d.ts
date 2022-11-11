import {JsonNode} from "../json";

export function equalObjects(o1: any, o2: any): boolean;
export function equalArrays(o1: object | null, o2: object | null): boolean;
export function equalMaps<K,V>(o1: Map<K,V> | null, o2: Map<K,V> | null): boolean;
export function arrayContains(a: any[], o: any): boolean;
export function removeAccents(s: string): string;
export function getUtf8StringLength(s: string): number;
/* the below inspired by MDN StringView.js */
export type CharCode = number;
export function getUtf8CharLength(c: CharCode): number;
export function stringToUtf8Buffer(s: string): ArrayBuffer;
export function utf8BufferToString(_buffer: ArrayBuffer | Uint8Array): string;
export function multiplyArray(items: any[], count: number): any[];
export function decimalToString(d: number): string;
export function isABoolean(o: any): boolean;
export function isAnInteger(o: any): boolean;
export function isADecimal(o: any): boolean;
export function isANumber(o: any): boolean;
export function isAText(o: any): boolean;
export function isACharacter(o: any): boolean;
export function isASet(o: any): boolean;
export function isAMethod(o: any, params: any[], result: any): boolean;
export function isAnEnum(o: any): boolean;
export function isInstanceOf(obj: any, type: any): boolean;
export function isCharacterUpperCase(char: string): boolean;
export function compareValues(value1: object | null, value2: object | null): number;
// borrowed from http://www.2ality.com/2011/11/improving-typeof.html
export function getTypeName(value: any): string | null;
export function convertToJsonNode(o: any): JsonNode;
export function convertToJsonString(o: any): string;
export function integerRange(start: number, end: number): number[];
