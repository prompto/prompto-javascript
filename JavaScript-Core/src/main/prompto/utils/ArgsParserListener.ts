// Generated from ArgsParser.g4 by ANTLR 4.11.2-SNAPSHOT

import { default as antlr4 } from 'antlr4';


import { ParseContext } from "./ArgsParser.js";
import { EntryContext } from "./ArgsParser.js";
import { KeyContext } from "./ArgsParser.js";
import { ELEMENTContext } from "./ArgsParser.js";
import { STRINGContext } from "./ArgsParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ArgsParser`.
 */
export default class ArgsParserListener extends antlr4.tree.ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ArgsParser.parse`.
	 * @param ctx the parse tree
	 */
	enterParse?: (ctx: ParseContext) => void;
	/**
	 * Exit a parse tree produced by `ArgsParser.parse`.
	 * @param ctx the parse tree
	 */
	exitParse?: (ctx: ParseContext) => void;
	/**
	 * Enter a parse tree produced by `ArgsParser.entry`.
	 * @param ctx the parse tree
	 */
	enterEntry?: (ctx: EntryContext) => void;
	/**
	 * Exit a parse tree produced by `ArgsParser.entry`.
	 * @param ctx the parse tree
	 */
	exitEntry?: (ctx: EntryContext) => void;
	/**
	 * Enter a parse tree produced by `ArgsParser.key`.
	 * @param ctx the parse tree
	 */
	enterKey?: (ctx: KeyContext) => void;
	/**
	 * Exit a parse tree produced by `ArgsParser.key`.
	 * @param ctx the parse tree
	 */
	exitKey?: (ctx: KeyContext) => void;
	/**
	 * Enter a parse tree produced by the `ELEMENT`
	 * labeled alternative in `ArgsParser.value`.
	 * @param ctx the parse tree
	 */
	enterELEMENT?: (ctx: ELEMENTContext) => void;
	/**
	 * Exit a parse tree produced by the `ELEMENT`
	 * labeled alternative in `ArgsParser.value`.
	 * @param ctx the parse tree
	 */
	exitELEMENT?: (ctx: ELEMENTContext) => void;
	/**
	 * Enter a parse tree produced by the `STRING`
	 * labeled alternative in `ArgsParser.value`.
	 * @param ctx the parse tree
	 */
	enterSTRING?: (ctx: STRINGContext) => void;
	/**
	 * Exit a parse tree produced by the `STRING`
	 * labeled alternative in `ArgsParser.value`.
	 * @param ctx the parse tree
	 */
	exitSTRING?: (ctx: STRINGContext) => void;
}

