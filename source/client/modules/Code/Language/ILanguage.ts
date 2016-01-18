module Code.Language
{
	export interface ILanguage
	{
		name: string;
		getLexer(): Lexer.Lexer;
		getInterpreter(): Interpreter.IInterpreter;
		getFormatter(): Formatter.IFormatter;
	}
}
