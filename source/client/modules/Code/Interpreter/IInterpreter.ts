module Code.Interpreter
{
	export interface IInterpreter
	{
		interpret(segments: Lexer.Segment[]): void;
	}
}
