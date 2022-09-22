export type JsonLeaf = null | boolean | number | string;
export type JsonObject = Map<string, JsonNode>;
export type JsonArray = JsonNode[];
export type JsonParent = JsonObject | JsonArray;
export type JsonNode = JsonParent | JsonLeaf;

