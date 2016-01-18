/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

module Application.Language.Factory
{
	export class PHPFactory
	{
		static createLanguage(lexer: Code.Lexer, formatter: Code.IFormatter)
		{
			const interpreter = new Code.Interpreter.JavaInterpreter(
				Keywords.PHP,
				Operators.PHP
			);
			const language = new Language("php", lexer, interpreter, formatter);
			return language;	
		}		
	}	
}
