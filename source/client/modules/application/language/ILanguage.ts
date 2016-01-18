module Application.Language
{
	export interface ILanguage
	{
		name: string;
		getLexer(): Code.Lexer;
		getInterpreter(): Code.IInterpreter;
		getFormatter(): Code.IFormatter;
	}
}
