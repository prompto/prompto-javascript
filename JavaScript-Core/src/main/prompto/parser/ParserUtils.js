export function getFullText(ctx) {
    const start = ctx.start;
    const stop = ctx.stop;
    if(start == null || stop == null || start.start<0 || stop.stop<0)
        return ctx.getText();
    return start.getInputStream().getText(start.start, stop.stop);
}