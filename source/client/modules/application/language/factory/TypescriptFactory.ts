/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

module Application.Language.Factory
{
	export class TypescriptFactory
	{
		static createLanguage(lexer: Code.Lexer, formatter: Code.IFormatter)
		{
			const interpreter = new Code.Interpreter.JavaInterpreter(
				Keywords.TS,
				Operators.TS
			);
			const language = new Language("ts", lexer, interpreter, formatter);
			return language;	
		}		
	}	
}
