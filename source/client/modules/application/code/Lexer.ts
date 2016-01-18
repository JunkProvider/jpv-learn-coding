/// <reference path="Segment" />
/// <reference path="ISegmentFinder" />

module Application.Code
{
	export class Lexer
	{
		private segmentFinders: ISegmentFinder[] = [];
		
		constructor(segmentFinders: ISegmentFinder[])
		{
			this.segmentFinders = segmentFinders;
		}
		
		lex(text: string)
		{
			const stream = Stream.createFromString(text);
			const segments: Segment[] = [];
			
			while (!stream.eos())
			{
				let segment = this.findSegment(stream);
				
				if (segment == null)
					segment = new Segment([ stream.read() ], LexerHint.NONE);	
				
				if (segments.length != 0)
				{
					const prevSibling = segments[segments.length - 1];
					prevSibling.nextSibling = segment;
					segment.prevSibling = prevSibling;
				}
				
				segments.push(segment);
			}
			
			return segments;
		}
		
		private findSegment(stream: Stream)
		{
			for (const finder of this.segmentFinders)
			{
				const segment = finder.find(stream);
				if (segment != null)
				{
					return segment;
				}	
			}
			return null;
		}
	}
}
