function $Root() {
    this.mutable = false;
    this.storable = this.storable || null;
    return this;
}

$Root.prototype.toString = function() {
    var names = Object.getOwnPropertyNames(this).filter(function(name) {
        return name!=="dbId" && name!=="mutable" && name!=="storable" && typeof(this[name])!='function';
    }, this);
    var vals = names.map(function (name) {
        return name + ':' + this[name];
    }, this);
    return "{" + vals.join(", ") + "}";
};

$Root.prototype.setMember = function(name, value, mutable) {
    if(!this.mutable || (value.mutable && !mutable))
        throw new NotMutableError();
    this[name] = value;
    if(this.storable)
        this.storable.setData(name, value);
};

$Root.prototype.fromStored = function(stored) {
    for(name in this) {
        if(name==='mutable' || name==='storable' || name==='category' || typeof(this[name]) === 'function')
            continue;
        this[name] = stored.getData(name);
    }
    this.dbId = stored.getData("dbId");
};

$Root.prototype.collectStorables = function(storablesToAdd) {
    if(this.storable)
        storablesToAdd.push(this.storable);
};


exports.$Root = $Root;