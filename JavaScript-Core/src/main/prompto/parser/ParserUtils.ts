import antlr4 from 'antlr4';

export function getFullText(ctx: antlr4.context.ParserRuleContext): string {
    const start = ctx.start;
    const stop = ctx.stop;
    if(start && start.start >= 0 && stop && stop.stop >= 0)
        return start.getInputStream().getText(start.start, stop.stop);
    else
        return ctx.getText();
}
