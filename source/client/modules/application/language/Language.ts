module Application.Language
{
	export class Language implements ILanguage
	{
		private _name: string;
		private lexer: Code.Lexer;
		private interpreter: Code.IInterpreter;
		private formatter: Code.IFormatter;
		
		get name() { return this._name; }
		
		constructor(
			name: string,
			lexer: Code.Lexer,
			interpreter: Code.IInterpreter,
			formatter: Code.IFormatter
		)
		{
			this._name = name;
			this.lexer = lexer;
			this.interpreter = interpreter;
			this.formatter = formatter;
		}
		
		getLexer()
		{
			return this.lexer;	
		}
		
		getInterpreter()
		{
			return this.interpreter;	
		}
		
		getFormatter()
		{
			return this.formatter;	
		}
	}
}
