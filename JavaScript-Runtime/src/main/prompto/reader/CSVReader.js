
/* we can't use Papa or other js csv libs, because they either load everything in memory or require a continuation */
/* ideally we would use generators, but support with browsers is poor so far */
/* so we use our own stuff until ES6 becomes widespread */

function csvIterate(text, columns, separator, encloser) {
    return new CSVIterator(text, columns, separator, encloser);
}

function csvRead(text, columns, separator, encloser) {
    var list = [];
    var iter = new CSVIterator(text, columns, separator, encloser);
    while(iter.hasNext())
        list.push(iter.next());
    return list;
}

function CSVIterator(text, columns, separator, encloser) {
    this.lines = text ? text.split(/\r?\n/) : null;
    this.columns = columns;
    this.separator = separator || ',';
    this.encloser = encloser || '"';
    this.headers = null;
    this.nextLine = null;
    return this;
}

CSVIterator.prototype.hasNext = function() {
    this.parseHeaders();
    this.readNextLine();
    return this.nextLine!=null;
};

CSVIterator.prototype.readNextLine = function() {
    if(this.lines==null || this.nextLine!=null)
        return;
    this.nextLine = this.lines.shift();
    if(this.lines.length==0)
        this.lines = null;
    if(this.nextLine.length==0) {
        this.nextLine = null;
        this.readNextLine();
    }
};

CSVIterator.prototype.parseHeaders = function() {
    if (this.headers == null) {
        this.readNextLine();
        if(this.nextLine) {
            var line = this.nextLine;
            this.nextLine = null;
            this.headers = this.parseLine(line);
            if(this.columns!=null) {
                var self = this;
                this.headers = this.headers.map(function(header) {
                    return self.columns[header] || header;
                });
            }
        }
    }
};

CSVIterator.prototype.parseLine = function(line) {
    var list = [];
    var nextIdx = 0;
    while(nextIdx<line.length)
        nextIdx = this.parseValue(line, nextIdx, list);
    return list;
};

CSVIterator.prototype.parseValue = function(line, startIdx, list) {
    if(line[startIdx]==this.separator) {
        list.push(null);
        return startIdx + 1;
    } else if(line[startIdx]==this.encloser)
        return this.parseQuotedValue(line, startIdx + 1, list);
    else
        return this.parseUnquotedValue(line, startIdx, list);
};

CSVIterator.prototype.parseQuotedValue = function(line, startIdx, list) {
    var endIdx = this.parseValueUpTo(line, startIdx, this.encloser, list);
    // consume next separator
    while(endIdx<line.length && line[endIdx]!=this.separator)
        endIdx++;
    return endIdx + 1;
};

CSVIterator.prototype.parseUnquotedValue = function(line, startIdx, list) {
    return this.parseValueUpTo(line, startIdx, this.separator, list);
};

CSVIterator.prototype.parseValueUpTo = function(line, startIdx, endChar, list) {
    var escape = false;
    var found = false;
    var endIdx = startIdx;
    while(endIdx<line.length) {
        if (line[endIdx] == endChar) {
            if (endIdx < line.length && line[endIdx + 1] == endChar) {
                escape = true;
                endIdx++;
            } else {
                found = true;
                break;
            }
        }
        if(line[endIdx]=='\\') {
            escape = true;
            endIdx++;
        }
        if(endIdx<=line.length)
            endIdx++;
    }
    var value = escape ?
        this.unescape(line, startIdx, endIdx, endChar) :
        line.substring(startIdx, endIdx);
    list.push(value);
    return endIdx + (found ? 1 : 0);
};


CSVIterator.prototype.unescape = function(value, startIdx, endIdx, endChar) {
    var chars = [];
    while(startIdx<endIdx) {
        if(value[startIdx]=='\\')
            startIdx++;
        else if(value[startIdx]==endChar && startIdx<endIdx-1 && value[startIdx+1]==endChar)
            startIdx++;
        if(startIdx<endIdx)
            chars.push(value[startIdx++]);
    }
    return chars.join("");
};


CSVIterator.prototype.next = function(value, startIdx, endIdx) {
    if(!this.hasNext()) // will parse headers
        return null;
    var line = this.nextLine;
    this.nextLine = null;
    var values = this.parseLine(line);
    var doc = {};
    for(var i=0;i<this.headers.length;i++) {
        if(i<values.length)
            doc[this.headers[i]] = values[i];
        else
            doc[this.headers[i]] = null;
    }
    return doc;
};

exports.csvIterate = csvIterate;
exports.csvRead = csvRead;