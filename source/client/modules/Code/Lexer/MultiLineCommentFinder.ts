/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class MultiLineCommentFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			if (stream.peek() != Common.CharCode.SLASH || stream.peek(1) != Common.CharCode.ASTERISK)
				return null;
			
			let chars = [ stream.read() ];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				if (char == Common.CharCode.SLASH && stream.peek(-2) == Common.CharCode.ASTERISK)
					break;
			}
			
			return new Segment(chars, LexerHint.COMMENT);
		}
	}
}
