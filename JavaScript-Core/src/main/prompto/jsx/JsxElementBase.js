var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;
var isCharacterUpperCase = require("../utils/Utils").isCharacterUpperCase;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var OCleverParser = require("../parser/OCleverParser").OCleverParser;
var WidgetPropertiesProcessor = require("../processor/WidgetPropertiesProcessor").WidgetPropertiesProcessor;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var AnyType = require("../type/AnyType").AnyType;

function JsxElementBase(id, properties) {
    IJsxExpression.call(this);
    this.id = id;
	this.properties = properties;
	return this;
}


JsxElementBase.prototype = Object.create(IJsxExpression.prototype);
JsxElementBase.prototype.constructor = JsxElementBase;


JsxElementBase.prototype.check = function(context) {
    if (isCharacterUpperCase(this.id.name[0])) {
        var propertyMap = this.getPropertyMap(context);
        this.checkWidgetProperties(context, propertyMap);
    } else {
        this.checkHtmlProperties(context)
    }
    return JsxType.instance;
};


JsxElementBase.prototype.getPropertyMap = function(context) {
    var decl = context.getRegisteredDeclaration(this.id.name);
    if (decl == null) {
        context.problemListener.reportUnknownIdentifier(this.id);
        return null;
    } else if(decl instanceof CategoryDeclaration && decl.isWidget())
        return decl.getProperties(context);
    else
        return null;
};

// ensure this stays in sync with Java version
const HTML_PROPERTY_TYPES = `{
    abbr: { type: Text, help: "Alternative label to use for the header cell when referencing the cell in other contexts"},
    accept: { type: any, help: "Hint for expected file type in file upload controls"},
    "accept-charset": { type: any, help: "Character encodings to use for form submission"},
    accesskey: { type: any, help: "Keyboard shortcut to activate or focus element"},
    action: { type: Text, help: "URL to use for form submission"},
    allow: { type: Text, help: "Feature policy to be applied to the iframe's contents"},
    allowfullscreen: { type: Boolean, help: "Whether to allow the iframe's contents to use requestFullscreen()"},
    allowpaymentrequest: { type: Boolean, help: "Whether the iframe's contents are allowed to use the PaymentRequest interface to make payment requests"},
    alt: { type: Text, help: "Replacement text for use when images are not available"},
    as: { type: any, help: "Potential destination for a preload request (for rel='preload' and rel='modulepreload')"},
    async: { type: Boolean, help: "Execute script when available, without blocking while fetching"},
    autocapitalize: { values: <null, "characters", "sentences", "words", "none", "off", "on">, help: "Recommended autocapitalization behavior (for supported input methods)"},
    autocomplete: { values: <null, "off", "on">, help: "Default setting for autofill feature for controls in the form"},
    autofocus: { type: Boolean, help: "Automatically focus the element when the page is loaded"},
    autoplay: { type: Boolean, help: "Hint that the media resource can be started automatically when the page is loaded"},
    charset: { type: Text, help: "Character encoding declaration"},
    checked: { type: Boolean, help: "Whether the control is checked"},
    cite: { type: Text, help: "Link to the source of the quotation or more information about the edit"},
    class: { type: Text, help: "Classes to which the element belongs"},
    color: { type: Text, help: "Color to use when customizing a site's icon (for rel='mask-icon')"},
    cols: { type: Integer, help: "Maximum number of characters per line"},
    colspan: { type: Integer, help: "Number of columns that the cell is to span"},
    content: { type: Text, help: "Value of the element"},
    contenteditable: { type: Boolean, help: "Whether the element is editable"},
    controls: { type: Boolean, help: "Show user agent controls"},
    coords: { type: Text, help: "Coordinates for the shape to be created in an image map"},
    crossorigin: { values: <null, "anonymous", "use-credentials">, help: "How the element handles crossorigin requests"},
    data: { type: Text, help: "Address of the resource"},
    datetime: { types: <Date, null, DateTime>, help: "Date and (optionally) time of the change"},
    decoding: { values: <null, "async", "auto", "sync">, help: "Decoding hint to use when processing this image for presentation"},
    default: { type: Boolean, help: "Enable the track if no other text track is more suitable"},
    defer: { type: Boolean, help: "Defer script execution"},
    dir: { values: <null, "auto", "ltr", "rtl">, help: "The text directionality of the element"},
    dirname: { type: Text, help: "Name of form control to use for sending the element's directionality in form submission"},
    disabled: { type: Boolean, help: "Whether the form control is disabled"},
    download: { type: any, help: "Whether to download the resource instead of navigating to it, and its file name if so"},
    draggable: { type: Boolean, help: "Whether the element is draggable"},
    enctype: { values: <null, "multipart/form-data", "application/x-www-form-urlencoded", "text/plain">, help: "Entry list encoding type to use for form submission"},
    enterkeyhint: { values: <"next", null, "search", "previous", "go", "enter", "done", "send">, help: "Hint for selecting an enter key action"},
    for: { type: any, help: "Associate the label with form control"},
    form: { type: any, help: "Associates the element with a form element"},
    formaction: { type: Text, help: "URL to use for form submission"},
    formenctype: { values: <null, "multipart/form-data", "application/x-www-form-urlencoded", "text/plain">, help: "Entry list encoding type to use for form submission"},
    formmethod: { values: <null, "dialog", "POST", "GET">, help: "Variant to use for form submission"},
    formnovalidate: { type: Boolean, help: "Bypass form control validation for form submission"},
    formtarget: { type: Text, help: "Browsing context for form submission"},
    headers: { type: any, help: "The header cells for this cell"},
    height: { type: Integer, help: "Vertical dimension"},
    hidden: { type: Boolean, help: "Whether the element is relevant"},
    high: { type: Decimal, help: "Low limit of high range"},
    href: { type: Text, help: "Address of the hyperlink"},
    hreflang: { type: any, help: "Language of the linked resource"},
    "http-equiv": { values: <"default-style", null, "x-ua-compatible", "content-security-policy", "refresh", "content-type">, help: "Pragma directive"},
    id: { type: Text, help: "The element's ID"},
    imagesizes: { type: Text, help: "Image sizes for different page layouts"},
    imagesrcset: { type: Text, help: "Images to use in different situations (e.g., high-resolution displays, small monitors, etc.)"},
    inputmode: { values: <null, "search", "numeric", "tel", "none", "text", "decimal", "email", "url">, help: "Hint for selecting an input modality"},
    integrity: { type: Text, help: "Integrity metadata used in Subresource Integrity checks [SRI]"},
    is: { type: any, help: "Creates a customized built-in element"},
    ismap: { type: Boolean, help: "Whether the image is a server-side image map"},
    itemid: { type: Text, help: "Global identifier for a microdata item"},
    itemprop: { type: any, help: "Property names of a microdata item"},
    itemref: { type: any, help: "Referenced elements"},
    itemscope: { type: Boolean, help: "Introduces a microdata item"},
    itemtype: { type: any, help: "Item types of a microdata item"},
    kind: { values: <null, "subtitles", "metadata", "chapters", "descriptions", "captions">, help: "The type of text track"},
    label: { type: Text, help: "User-visible label"},
    lang: { type: any, help: "Language of the element"},
    list: { type: any, help: "List of autocomplete options"},
    loop: { type: Boolean, help: "Whether to loop the media resource"},
    low: { type: Decimal, help: "High limit of low range"},
    manifest: { type: Text, help: "Application cache manifest"},
    max: { type: any, help: "Maximum value"},
    maxlength: { type: Integer, help: "Maximum length of value"},
    media: { type: Text, help: "Applicable media"},
    method: { values: <null, "dialog", "POST", "GET">, help: "Variant to use for form submission"},
    min: { type: any, help: "Minimum value"},
    minlength: { type: Integer, help: "Minimum length of value"},
    multiple: { type: Boolean, help: "Whether to allow multiple values"},
    muted: { type: Boolean, help: "Whether to mute the media resource by default"},
    name: { type: Text, help: "Name of the element to use for form submission and in the form.elements API"},
    nomodule: { type: Boolean, help: "Prevents execution in user agents that support module scripts"},
    nonce: { type: Text, help: "Cryptographic nonce used in Content Security Policy checks [CSP]"},
    novalidate: { type: Boolean, help: "Bypass form control validation for form submission"},
    open: { type: Boolean, help: "Whether the details are visible"},
    optimum: { type: Decimal, help: "Optimum value in gauge"},
    pattern: { type: Text, help: "Pattern to be matched by the form control's value"},
    ping: { type: any, help: "URLs to ping"},
    placeholder: { type: Text, help: "User-visible label to be placed within the form control"},
    playsinline: { type: Boolean, help: "Encourage the user agent to display video content within the element's playback area"},
    poster: { type: Text, help: "Poster frame to show prior to video playback"},
    preload: { values: <null, "metadata", "auto", "none">, help: "Hints how much buffering the media resource will likely need"},
    readonly: { type: Boolean, help: "Whether to allow the value to be edited by the user"},
    referrerpolicy: { values: <"strict-origin-when-cross-origin", null, "strict-origin", "origin", "unsafe-url", "no-referrer", "same-origin", "no-referrer-when-downgrade", "origin-when-cross-origin">, help: "Referrer policy for fetches initiated by the element"},
    rel: { type: Text, help: "Relationship between the location in the document containing the hyperlink and the destination resource"},
    required: { type: Boolean, help: "Whether the control is required for form submission"},
    reversed: { type: Boolean, help: "Number the list backwards"},
    rows: { type: Integer, help: "Number of lines to show"},
    rowspan: { type: Integer, help: "Number of rows that the cell is to span"},
    sandbox: { type: any, help: "Security rules for nested content"},
    scope: { values: <null, "col", "row", "colgroup", "rowgroup">, help: "Specifies which cells the header cell applies to"},
    selected: { type: Boolean, help: "Whether the option is selected by default"},
    shape: { values: <null, "rect", "default", "poly", "circle">, help: "The kind of shape to be created in an image map"},
    size: { type: Integer, help: "Size of the control"},
    sizes: { type: any, help: "Sizes of the icons (for rel='icon')"},
    slot: { type: Text, help: "The element's desired slot"},
    span: { type: Integer, help: "Number of columns spanned by the element"},
    spellcheck: { type: Boolean, help: "Whether the element is to have its spelling and grammar checked"},
    src: { type: Text, help: "Address of the resource"},
    srcdoc: { type: Text, help: "A document to render in the iframe"},
    srclang: { type: any, help: "Language of the text track"},
    srcset: { type: Text, help: "Images to use in different situations (e.g., high-resolution displays, small monitors, etc.)"},
    start: { type: Integer, help: "Starting value of the list"},
    step: { type: any, help: "Granularity to be matched by the form control's value"},
    style: { type: any, help: "Presentational and formatting instructions"},
    tabindex: { type: Integer, help: "Whether the element is focusable, and the relative order of the element for the purposes of sequential focus navigation"},
    target: { type: Text, help: "Browsing context for hyperlink navigation"},
    title: { type: Text, help: "Advisory information for the element"},
    translate: { values: <null, "no", "yes">, help: "Whether the element is to be translated when the page is localized"},
    type: { type: Text, help: "Hint for the type of the referenced resource"},
    usemap: { type: Text, help: "Name of image map to use"},
    value: { type: Text, help: "Value to be used for form submission"},
    width: { type: Integer, help: "Horizontal dimension"},
    wrap: { values: <null, "hard", "soft">, help: "How the value of the form control is to be wrapped for form submission"},
    onClick: ClickEventCallback,
    onContextMenu: ClickEventCallback,
    onChange: InputChangedCallback,
    key: Any 
}`; // TODO: 'key' is for React only


let HTML_PROPERTIES_MAP = null;
let HTML_TEST_MODE = false;

JsxElementBase.getHtmlProperties = function(context, name) {
    if(HTML_PROPERTIES_MAP==null) {
        const parser = new OCleverParser(HTML_PROPERTY_TYPES);
        const types = parser.parse_document_literal();
        if(HTML_TEST_MODE) {
            const any = new TypeLiteral(AnyType.instance);
            types.entries.items.forEach(function(e) { e.value = any; });
        }
        const processor = new WidgetPropertiesProcessor();
        HTML_PROPERTIES_MAP = processor.loadProperties(null, context, types);
    }
    return HTML_PROPERTIES_MAP; // TODO filter by html tag name
};


JsxElementBase.prototype.checkWidgetProperties = function(context, propertyMap) {
    var actualNames = new Set();
    if(this.properties!==null)
        this.properties.forEach(function(prop) {
            if(actualNames.has(prop.id.name))
                context.problemListener.reportDuplicateProperty(prop, prop.id.name);
            else
                actualNames.add(prop.id.name);
            prop.check(context);
            if(propertyMap) {
                var declared = propertyMap.get(prop.id.name);
                if(declared==null)
                    declared = JsxElementBase.getHtmlProperties(context).get(prop.id.name);
                if(declared==null)
                    context.problemListener.reportUnknownProperty(prop, prop.id.name);
                else
                    declared.validate(context, prop)
            }
        });
    if(propertyMap!==null) {
        for(var name in propertyMap.entries) {
            var prop = propertyMap.entries[name];
            if(prop.isRequired() && !actualNames.has(name))
                context.problemListener.reportMissingProperty(this, name);
        }
    }
};


JsxElementBase.prototype.checkHtmlProperties = function(context) {
    var propertyMap = JsxElementBase.getHtmlProperties(context);
    var actualNames = new Set();
    if(this.properties!==null)
        this.properties.forEach(function(prop) {
            if(actualNames.has(prop.id.name))
                context.problemListener.reportDuplicateProperty(prop, prop.id.name);
            else
                actualNames.add(prop.id.name);
            prop.check(context);
            var declared = propertyMap.get(prop.id.name);
            if(declared==null)
                context.problemListener.reportUnknownProperty(prop, prop.id.name);
            else
                declared.validate(context, prop)
        });
    Object.getOwnPropertyNames(propertyMap.entries).forEach(function(name) {
        var prop = propertyMap.entries[name];
        if(prop.isRequired() && !actualNames.has(name))
            context.problemListener.reportMissingProperty(this, name);
    }, this);
};

JsxElementBase.prototype.declare = function(transpiler) {
    if (isCharacterUpperCase(this.id.name[0])) {
        var decl = transpiler.context.getRegisteredDeclaration(this.id.name);
        if(decl==null)
            transpiler.context.problemListener.reportUnknownIdentifier(this.id);
        else
            decl.declare(transpiler);
    }
    if(this.properties!=null) {
        this.properties.forEach(function (prop) {
            prop.declare(transpiler);
        });
    }
    this.declareChildren(transpiler);
};



JsxElementBase.prototype.declareChildren = function(transpiler) {
    // nothing to do
};


JsxElementBase.prototype.transpile = function(transpiler) {
    transpiler.append("React.createElement(");
    if (isCharacterUpperCase(this.id.name[0]))
        transpiler.append(this.id.name);
    else
        transpiler.append('"').append(this.id.name).append('"');
    transpiler.append(", ");
    if(this.properties==null || this.properties.length===0)
        transpiler.append("null");
    else {
        transpiler.append("{");
        this.properties.forEach(function(attr) {
            attr.transpile(transpiler);
            transpiler.append(", ");
        });
        transpiler.trimLast(2).append("}");
    }
    this.transpileChildren(transpiler);
    transpiler.append(")");
};

JsxElementBase.prototype.transpileChildren = function(transpiler) {
    // nothing to do
};

JsxElementBase.set_HTML_TEST_MODE = function(mode) {
    HTML_TEST_MODE = mode;
};

exports.JsxElementBase = JsxElementBase;
