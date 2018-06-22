exports.getFullText = function(ctx) {
    var start = ctx.start;
    var stop = ctx.stop;
    if(start == null || stop == null || start.start<0 || stop.stop<0)
        return ctx.getText();
    return start.getInputStream().getText(start.start, stop.stop);
};