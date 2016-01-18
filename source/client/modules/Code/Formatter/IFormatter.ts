module Code.Formatter
{
	export interface IFormatter
	{
		format(segments: Lexer.Segment[]): string;
	}
}
