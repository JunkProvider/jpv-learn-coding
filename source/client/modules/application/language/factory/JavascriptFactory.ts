/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

module Application.Language.Factory
{
	export class JavascriptFactory
	{
		static createLanguage(lexer: Code.Lexer, formatter: Code.IFormatter)
		{
			const interpreter = new Code.Interpreter.JavaInterpreter(
				Keywords.JS,
				Operators.JS
			);
			const language = new Language("js", lexer, interpreter, formatter);
			return language;	
		}		
	}	
}
