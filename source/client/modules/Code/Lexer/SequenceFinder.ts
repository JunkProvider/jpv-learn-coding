/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />

module Code.Lexer
{
	export class SequenceFinder implements ISegmentFinder
	{
		static createFromStringArray(texts: string[], hint: LexerHint)
		{
			const charCodes: number[][] = [];
			for (const text of texts)
			{
				const sequenceCharCodes: number[] = [];
				for (let i = 0; i < text.length; i++)
				{
					sequenceCharCodes.push(text.charCodeAt(i));	
				}
				charCodes.push(sequenceCharCodes);
			}
			return new SequenceFinder(charCodes, hint);
		}
		
		private searchedSequences: number[][] = [];
		private hint: LexerHint;
		
		constructor(searchedSequences: number[][], hint: LexerHint)
		{
			this.searchedSequences = searchedSequences;
			this.hint = hint;
		}
		
		find(stream: Stream)
		{
			for (const searchedSequence of this.searchedSequences)
			{
				const segment = this.findSequence(stream, searchedSequence);
				if (segment != null)
					return segment;
			}
				
			return null;
		}
		
		private findSequence(stream: Stream, sequence: number[])
		{
			for (let i = 0; i < sequence.length; i++)	
			{
				if (stream.peek(i) != sequence[i])
					return null;
			}
			return new Segment(stream.readMultiple(sequence.length), this.hint);
		}
	}
}
