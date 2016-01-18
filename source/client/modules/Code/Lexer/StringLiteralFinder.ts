/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class StringLiteralFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			const delimiterChar = stream.peek();
			
			if (delimiterChar != Common.CharCode.DOUBLE_QUOTE && delimiterChar != Common.CharCode.SINGLE_QUOTE)
				return null;

			let chars = [ stream.read() ];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				if (char == delimiterChar)
					break;
			}
			
			return new Segment(chars, LexerHint.STRING);
		}
	}
}
