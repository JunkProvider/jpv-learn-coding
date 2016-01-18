/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

module Application.Language.Factory
{
	export class JassFactory
	{
		static createLanguage(lexer: Code.Lexer, formatter: Code.IFormatter)
		{
			const interpreter = new Code.Interpreter.JavaInterpreter(
				Keywords.JASS,
				Operators.JASS
			);
			const language = new Language("jass", lexer, interpreter, formatter);
			return language;	
		}		
	}	
}
