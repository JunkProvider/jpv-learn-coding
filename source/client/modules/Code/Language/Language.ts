module Code.Language
{
	export class Language implements ILanguage
	{
		private _name: string;
		private lexer: Lexer.Lexer;
		private interpreter: Interpreter.IInterpreter;
		private formatter: Formatter.IFormatter;
		
		get name() { return this._name; }
		
		constructor(
			name: string,
			lexer: Lexer.Lexer,
			interpreter: Interpreter.IInterpreter,
			formatter: Formatter.IFormatter
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
