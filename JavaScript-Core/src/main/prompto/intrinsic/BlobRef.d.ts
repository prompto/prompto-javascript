import {JsonNode} from "../json";

export default class BlobRef {

    static readParts(data: any): object;
    static readValue(parts: object): JsonNode;

}
