import JsxElementBase from './JsxElementBase.js'

export default class JsxSelfClosing extends JsxElementBase {

    constructor(id, nameSuite, properties, elementSuite) {
        super(id, properties);
        this.nameSuite = nameSuite;
        this.elementSuite = elementSuite;
    }

    toDialect(writer) {
        writer.append("<").append(this.id.name);
        if(this.nameSuite!=null)
            writer.appendRaw(this.nameSuite);
        else if(this.properties.length > 0)
            writer.append(" ");
        this.properties.forEach(prop => {
            prop.toDialect(writer);
        });
        writer.append("/>");
        if(this.elementSuite!=null)
            writer.appendRaw(this.elementSuite);
    }
}

