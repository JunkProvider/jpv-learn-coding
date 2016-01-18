/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class WordFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			const firstChar = stream.peek();
			if (!Common.CharCode.isLetter(firstChar) && firstChar != Common.CharCode.SCORE)
				return null;
			
			let chars: number[] = [];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				const nextChar = stream.peek();
				if (!Common.CharCode.isAlphanumeric(nextChar) && nextChar != Common.CharCode.SCORE)
					break;
			}
			
			return new Segment(chars, LexerHint.WORD);
		}
	}
}
