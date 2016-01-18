module Code.Lexer
{
	export interface ISegmentFinder
	{
		find(stream: Stream): Segment;
	}
}
