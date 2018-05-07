function StrictSet(values) {
    this.set = new Set(values);
    return this;
}

StrictSet.prototype.toString = function() {
    var values = Array.from(this.set.values()).map(function (item) {
        return item.toString();
    });
    return "<" + values.join(", ") + ">";
};

StrictSet.prototype.size = function() {
    return this.set.size;
};

StrictSet.prototype.values = function() {
    return this.set.values();
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