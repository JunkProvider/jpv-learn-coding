/// <reference path="../Segment" />
/// <reference path="../Stream" />
/// <reference path="../CharCode" />

module Application.Code.SegmentFinder
{
	export class MultiLineCommentFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			if (stream.peek() != CharCode.SLASH || stream.peek(1) != CharCode.ASTERISK)
				return null;
			
			let chars = [ stream.read() ];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				if (char == CharCode.SLASH && stream.peek(-2) == CharCode.ASTERISK)
					break;
			}
			
			return new Segment(chars, LexerHint.COMMENT);
		}
	}
}
