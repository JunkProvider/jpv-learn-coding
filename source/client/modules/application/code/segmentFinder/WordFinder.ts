/// <reference path="../Segment" />
/// <reference path="../Stream" />

module Application.Code.SegmentFinder
{
	export class WordFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			const firstChar = stream.peek();
			if (!CharCode.isLetter(firstChar) && firstChar != CharCode.SCORE)
				return null;
			
			let chars: number[] = [];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				const nextChar = stream.peek();
				if (!CharCode.isAlphanumeric(nextChar) && nextChar != CharCode.SCORE)
					break;
			}
			
			return new Segment(chars, LexerHint.WORD);
		}
	}
}
