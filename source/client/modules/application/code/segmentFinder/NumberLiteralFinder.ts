/// <reference path="../Segment" />
/// <reference path="../Stream" />

module Application.Code.SegmentFinder
{
	export class NumberLiteralFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			const firstChar = stream.peek();
			if (!CharCode.isNumber(firstChar))
				return null;
			
			let chars: number[] = [];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				const nextChar = stream.peek();
				if (!CharCode.isNumber(nextChar) && nextChar != CharCode.DOT && nextChar != CharCode.f)
					break;
			}
			
			return new Segment(chars, LexerHint.NUMBER);
		}
	}
}
