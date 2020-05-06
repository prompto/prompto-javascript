function csvWrite(docs, headers, mappings, separator, encloser) {
    separator = new RegExp(separator || ",", 'g');
    encloser = new RegExp(encloser || '"', 'g');
    var data = [];
    if(mappings) {
        var columns = headers.map(function(header) { return mappings[header] || header; })
                                .map(function(value) { return escapeIfRequired(value, separator); })
                                .map(function(value) { return encloseIfRequired(value, encloser); });
        data.push(columns.join(","));
    } else
        data.push(headers.join(","));
    data.push("\n");
    docs.forEach(function(doc) {
        var columns = headers.map(function(header) { return doc[header] || ""; })
                            .map(function(value) { return value.toString();})
                            .map(function(value) { return escapeIfRequired(value, separator); })
                            .map(function(value) { return encloseIfRequired(value, encloser); });
        data.push(columns.join(","));
        data.push("\n");
    });
    return data.join("");
}

function escapeIfRequired(value, separator) {
    return value.replace(separator, "\\" + separator);
}

function encloseIfRequired(value, encloser) {
    return value.indexOf("\n") > 0 ? encloser + value.replace(encloser, "\\" + encloser) + encloser : value;
}

exports.csvWrite = csvWrite;