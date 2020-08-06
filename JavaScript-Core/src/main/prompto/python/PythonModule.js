class PythonModule {
    constructor(ids) {
        this.ids = ids;
    }

    toDialect(writer) {
        writer.append(" from module: ");
        this.ids.forEach(id => {
            writer.append(id);
            writer.append('.');
        });
        writer.trimLast(1);
    }
}

exports.PythonModule = PythonModule;