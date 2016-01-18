/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class NumberLiteralFinder implements ISegmentFinder
	{
		find(stream: Stream)
		{
			const firstChar = stream.peek();
			if (!Common.CharCode.isNumber(firstChar))
				return null;
			
			let chars: number[] = [];
			for (let char = stream.read(); char != -1; char = stream.read())
			{
				chars.push(char);
				const nextChar = stream.peek();
				if (!Common.CharCode.isNumber(nextChar) && nextChar != Common.CharCode.DOT && nextChar != Common.CharCode.f)
					break;
			}
			
			return new Segment(chars, LexerHint.NUMBER);
		}
	}
}
