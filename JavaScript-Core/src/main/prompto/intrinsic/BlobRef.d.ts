import {JsonNode} from "../json";

export default class BlobRef {
    static readParts(data: any): Map<string, ArrayBuffer>;
    static readValue(parts: object): JsonNode;
    static zipDatas(data: any): ArrayBuffer;

}
