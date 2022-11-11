export declare type JsonLeaf = null | boolean | number | string;
export declare type JsonObject = Map<string, JsonNode>;
export declare type JsonArray = JsonNode[];
export declare type JsonParent = JsonObject | JsonArray;
export declare type JsonNode = JsonParent | JsonLeaf;
