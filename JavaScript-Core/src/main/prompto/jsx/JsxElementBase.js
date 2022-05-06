import IJsxExpression from './IJsxExpression.js'
import { isCharacterUpperCase } from '../utils/index.js'
import { JsxType, AnyType } from '../type/index.js'
import { CategoryDeclaration } from '../declaration/index.js'
import { OCleverParser } from '../parser/index.js'
import { TypeLiteral } from '../literal/index.js'
import { WidgetPropertiesProcessor } from '../processor/index.js'
import {Dialect} from "../parser/index";

export default class JsxElementBase extends IJsxExpression {
  
    constructor(id, properties) {
        super();
        this.id = id;
        this.properties = properties;
    }

    check(context) {
        if(this.isHtmlTag())
            this.checkHtmlTag(context);
        else
            this.checkWidgetTag(context);
        return JsxType.instance;
    }

    isHtmlTag() {
        return !isCharacterUpperCase(this.id.name[0]);
    }

    checkHtmlTag(context) {
        this.checkWidgetProperties(context, JsxElementBase.getHtmlPropertyMap(context, this.id.name));
    }

    checkWidgetTag(context) {
        this.checkConstructable(context);
        this.checkWidgetProperties(context, this.getWidgetPropertyMap(context));
    }

    checkConstructable(context) {
        const decl = context.getRegisteredDeclaration(this.id);
        if (decl == null || !decl.isWidget(context))
            context.problemListener.reportUnknownWidget(this, this.id.name);
        if(decl!=null)
            decl.getAbstractMethods(context).forEach(method => context.problemListener.reportIllegalAbstractWidget(this, decl.name, method.getSignature(Dialect.O)));
    }


    getPropertyMap(context) {
        return this.isHtmlTag() ? JsxElementBase.getHtmlPropertyMap(context, this.id.name) : this.getWidgetPropertyMap(context);
    }

    getWidgetPropertyMap(context) {
        const decl = context.getRegisteredDeclaration(this.id);
        if (decl == null) {
            context.problemListener.reportUnknownIdentifier(this.id, this.id.name);
            return null;
        } else if(decl instanceof CategoryDeclaration && decl.isWidget())
            return decl.getProperties(context);
        else
            return null;
    }

    static getHtmlPropertyMap(context, tagName) {
        if(HTML_PROPERTIES_MAP==null) {
            const parser = new OCleverParser(HTML_PROPERTY_TYPES);
            const types = parser.parse_document_literal();
            if(HTML_TEST_MODE) {
                const any = new TypeLiteral(AnyType.instance);
                types.entries.items.forEach(e => { e.value = any; });
            }
            const processor = new WidgetPropertiesProcessor();
            HTML_PROPERTIES_MAP = processor.loadProperties(null, context, types);
        }
        return HTML_PROPERTIES_MAP; // TODO filter by html tag name
    }

    checkWidgetProperties(context, propertyMap) {
        const actualNames = new Set();
        if(this.properties!==null)
            this.properties.forEach( jsxprop => {
                if(actualNames.has(jsxprop.id.name))
                    context.problemListener.reportDuplicateProperty(jsxprop, jsxprop.id.name);
                else
                    actualNames.add(jsxprop.id.name);
                this.checkWidgetProperty(context, propertyMap, jsxprop);
            }, this);
        if(propertyMap!==null) {
            Object.getOwnPropertyNames(propertyMap.entries).forEach(function(name) {
                const prop = propertyMap.entries[name];
                if(prop.isRequired() && !actualNames.has(name))
                    context.problemListener.reportMissingProperty(this, name);
            }, this);
        }
    }

    checkWidgetProperty(context, propertyMap, jsxProp) {
        if(propertyMap) {
            const name = jsxProp.id.name;
            let property = propertyMap.get(name);
            if(property==null && !this.isHtmlTag(context))
                property = JsxElementBase.getHtmlPropertyMap(context).get(name);
            if(property==null)
                context.problemListener.reportUnknownProperty(jsxProp, name);
            else
                property.validate(context, jsxProp)
        } else
            jsxProp.check(context);
    }

    declare(transpiler) {
        if (!this.isHtmlTag()) {
            const decl = transpiler.context.getRegisteredDeclaration(this.id);
            if(decl==null)
                transpiler.context.problemListener.reportUnknownIdentifier(this.id, this.id.name);
            else
                decl.declare(transpiler.newLocalTranspiler());
        }
        if(this.properties!=null) {
            const propertyMap = this.getPropertyMap(transpiler.context);
            this.properties.forEach(function (jsxprop) {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.declareProperty(transpiler, propertyMap, jsxprop);
            }, this);
        }
        this.declareChildren(transpiler);
    }

    declareProperty(transpiler, propertyMap, jsxProp) {
        const name = jsxProp.id.name;
        let property = propertyMap ? propertyMap.get(name) : null;
        if(!property && !this.isHtmlTag())
            property = JsxElementBase.getHtmlPropertyMap(transpiler.context).get(name);
        if(property)
            property.declare(transpiler, jsxProp);
        else
            jsxProp.declare(transpiler);

    }

    declareChildren(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("React.createElement(");
        if (isCharacterUpperCase(this.id.name[0]))
            transpiler.append(this.id.name);
        else
            transpiler.append('"').append(this.id.name).append('"');
        transpiler.append(", ");
        if(this.properties==null || this.properties.length===0)
            transpiler.append("null");
        else {
            const propertyMap = this.getPropertyMap(transpiler.context);
            transpiler.append("{");
            this.properties.forEach(function(jsxProp) {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.transpileProperty(transpiler, propertyMap, jsxProp);
                transpiler.append(", ");
            }, this);
            transpiler.trimLast(2).append("}");
        }
        this.transpileChildren(transpiler);
        transpiler.append(")");
    }

    transpileProperty(transpiler, propertyMap, jsxProp) {
        const name = jsxProp.id.name;
        let property = propertyMap ? propertyMap.get(name) : null;
        if(!property && !this.isHtmlTag())
            property = JsxElementBase.getHtmlPropertyMap(transpiler.context).get(name);
        if(property)
            property.transpile(transpiler, jsxProp);
        else
            jsxProp.transpile(transpiler);

    }

    transpileChildren(transpiler) {
        // nothing to do
    }

    static set_HTML_TEST_MODE(mode) {
        HTML_PROPERTIES_MAP = null;
        HTML_TEST_MODE = mode;
    }

}

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
    dangerouslySetInnerHTML : { type: Document, help: "Sets node.innerHtml"},
    onClick: MouseEventCallback,
    onContextMenu: MouseEventCallback,
    onDoubleClick: MouseEventCallback,
    onMouseDown: MouseEventCallback,
    onMouseEnter: MouseEventCallback,
    onMouseLeave: MouseEventCallback,
    onMouseMove: MouseEventCallback,
    onMouseOut: MouseEventCallback,
    onMouseOver: MouseEventCallback,
    onMouseUp: MouseEventCallback,
    onKeyDown: KeyboardEventCallback,
    onKeyUp: KeyboardEventCallback,
    onSubmit: SubmitEventCallback,
    onChange: InputChangedEventCallback,
    key: Any,
    ref: Text 
}`; // TODO: 'key' and 'ref' are for React only


let HTML_PROPERTIES_MAP = null;
let HTML_TEST_MODE = false;

