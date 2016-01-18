/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

module Application.Language.Factory
{
	export class JavaFactory
	{
		static createLanguage(lexer: Code.Lexer, formatter: Code.IFormatter)
		{
			const interpreter = new Code.Interpreter.JavaInterpreter(
				Keywords.JAVA,
				Operators.JAVA
			);
			const language = new Language("java", lexer, interpreter, formatter);
			return language;	
		}		
	}	
}
