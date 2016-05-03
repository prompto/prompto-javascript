function PythonModule(ids) {
    this.ids = ids;
}

PythonModule.prototype.toDialect = function(writer) {
    writer.append(" from module: ");
    this.ids.forEach(function(id) {
        writer.append(id);
        writer.append('.');
    });
    writer.trimLast(1);
}

exports.PythonModule = PythonModule;