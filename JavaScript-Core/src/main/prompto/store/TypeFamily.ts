export default class TypeFamily {

    // non storable
    static BOOLEAN = new TypeFamily("BOOLEAN");
    static CHARACTER = new TypeFamily("CHARACTER");
    static INTEGER = new TypeFamily("INTEGER");
    static DECIMAL = new TypeFamily("DECIMAL");
    static TEXT = new TypeFamily("TEXT");
    static UUID = new TypeFamily("UUID");
    static DATE = new TypeFamily("DATE");
    static TIME = new TypeFamily("TIME");
    static DATETIME = new TypeFamily("DATETIME");
    static PERIOD = new TypeFamily("PERIOD");
    static VERSION = new TypeFamily("VERSION");
    static LIST = new TypeFamily("LIST");
    static SET = new TypeFamily("SET");
    static TUPLE = new TypeFamily("TUPLE");
    static RANGE = new TypeFamily("RANGE");
    static BLOB = new TypeFamily("BLOB");
    static IMAGE = new TypeFamily("IMAGE");
    static DOCUMENT = new TypeFamily("DOCUMENT");
    static CATEGORY = new TypeFamily("CATEGORY");
    static RESOURCE = new TypeFamily("RESOURCE");
    static DICTIONARY = new TypeFamily("DICTIONARY");
    static ENUMERATED = new TypeFamily("ENUMERATED");
    // non storable
    static VOID = new TypeFamily("VOID");
    static NULL = new TypeFamily("NULL");
    static ANY = new TypeFamily("ANY");
    static METHOD = new TypeFamily("METHOD");
    static CURSOR = new TypeFamily("CURSOR");
    static ITERATOR = new TypeFamily("ITERATOR");
    static PROPERTIES = new TypeFamily("PROPERTIES");
    static CLASS = new TypeFamily("CLASS");
    static TYPE = new TypeFamily("TYPE");
    static CODE = new TypeFamily("CODE");
    static JSX = new TypeFamily("JSX");
    static CSS = new TypeFamily("CSS");
    static HTML = new TypeFamily("HTML");
    // volatile
    static MISSING = new TypeFamily("MISSING");

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    toTranspiled(): string {
        return "new TypeFamily('" + this.name + "')";
    }
}

