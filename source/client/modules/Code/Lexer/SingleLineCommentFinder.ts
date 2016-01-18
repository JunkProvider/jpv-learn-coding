/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class SingleLineCommentFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			if (stream.peek() != Common.CharCode.SLASH || stream.peek(1) != Common.CharCode.SLASH)
				return null;
			
			let chars = [ stream.read() ];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				if (stream.peek() == Common.CharCode.LINE_BREAK)
					break;
			}
			
			return new Segment(chars, LexerHint.COMMENT);
		}
	}
}
