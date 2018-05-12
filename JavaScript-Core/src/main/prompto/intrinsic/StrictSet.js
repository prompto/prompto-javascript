function StrictSet(values) {
    this.set = new Set(values);
    return this;
}

Object.defineProperty(StrictSet.prototype, "length", {
    get : function() {
        return this.set.size;
    }
});

StrictSet.prototype.toString = function() {
    return "<" + Array.from(this.set.values()).join(", ") + ">";
};

StrictSet.prototype.values = function() {
    return this.set.values();
};


StrictSet.prototype.addAll = function(items) {
    if(items instanceof StrictSet)
        items = Array.from(items.values());
    items.forEach(function(item){
        this.add(item);
    }, this);
    return this; // enable fluid API
};


StrictSet.prototype.add = function(value) {
    if(this.has(value))
        return false;
    else {
        this.set.add(value);
        return true;
    }
};

StrictSet.prototype.has = function(value) {
    if(this.set.has(value))
        return true;
    var iter = this.set.values();
    var item = iter.next();
    while(!item.done) {
        if(value.equals && value.equals(item.value))
            return true;
        item = iter.next();
    }
    return false;
};

StrictSet.prototype.equals = function(other) {
    if(!(other instanceof StrictSet))
        return false;
    else if(this.size()!=other.size())
        return false;
    else {
        var iter = this.set.values();
        var item = iter.next();
        while(!item.done) {
            if(!other.has(item.value))
                return false;
            item = iter.next();
        }
        return true;
    }
};


exports.StrictSet = StrictSet;