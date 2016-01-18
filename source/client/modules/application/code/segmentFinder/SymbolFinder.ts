/// <reference path="../Segment" />
/// <reference path="../Stream" />

module Application.Code.SegmentFinder
{
	export class SymbolFinder implements ISegmentFinder
	{
		static createFromString(chars: string, hint: LexerHint)
		{
			const charCodes: number[] = [];
			for (let i = 0; i < chars.length; i++)
			{
				charCodes.push(chars.charCodeAt(i));	
			}
			return new SymbolFinder(charCodes, hint);
		}
		
		static createFromStringArray(chars: string[], hint: LexerHint)
		{
			const charCodes: number[] = [];
			for (const char of chars)
			{
				if (char.length != 1)
					throw new Error("Each string must be a single char!");	
				
				charCodes.push(char.charCodeAt(0));
			}
			return new SymbolFinder(charCodes, hint);
		}
		
		private searchedChars: number[] = [];
		private hint: LexerHint;
		
		constructor(searchedChars: number[], hint: LexerHint)
		{
			this.searchedChars = searchedChars;
			this.hint = hint;
		}
		
		find(stream: Stream)
		{
			const char = stream.peek();
			const searchedChars = this.searchedChars;
			for (let i = 0, len = searchedChars.length; i < len; i++)
			{
				if (char == searchedChars[i])
				{
					return new Segment([ stream.read() ], this.hint);	
				}	
			}
			
			return null;
		}
	}
}
