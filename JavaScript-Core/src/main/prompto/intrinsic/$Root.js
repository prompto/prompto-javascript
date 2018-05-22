function $Root() {
    this.mutable = false;
    this.storable = this.storable || null;
    return this;
}

$Root.prototype.setMember = function(name, value) {
    this[name] = value;
    if(this.storable)
        this.storable.setData(name, value);
};

$Root.prototype.fromStored = function(stored) {
    this.dbId = stored.getData("dbId");
    for(name in this) {
        this[name] = stored.getData(name);
    }
};

$Root.prototype.collectStorables = function(storablesToAdd) {
    if(this.storable)
        storablesToAdd.push(this.storable);
};


exports.$Root = $Root;