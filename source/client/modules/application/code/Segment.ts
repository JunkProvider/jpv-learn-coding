/// <reference path="LexerHint" />

module Application.Code
{
	export interface SegmentFilterFunction
	{
		(segment: Segment): boolean;	
	}
	
	export class Segment
	{
		nextSibling: Segment = null;
		prevSibling: Segment = null;
		
		chars: number[] = [];
		text: string = "";
		lexerHint: LexerHint = LexerHint.NONE;
		interpreterHint: Interpreter.InterpreterHint = Interpreter.InterpreterHint.NONE;
		
		constructor(chars: number[], hint: LexerHint)
		{
			this.chars = chars;
			this.lexerHint = hint;
			
			this.text = "";
			for (let i = 0; i < this.chars.length; i++)
			{
				this.text += String.fromCharCode(this.chars[i]);	
			}
		}
		
		getNextRelevantSibling()
		{
			return this.getNextMatchingSibling(
				(segment) => segment.lexerHint != LexerHint.WHITESPACE && segment.lexerHint != LexerHint.COMMENT
			);	
		}
		
		getPrevRelevantSibling()
		{
			return this.getPrevMatchingSibling(
				(segment) => segment.lexerHint != LexerHint.WHITESPACE && segment.lexerHint != LexerHint.COMMENT
			);	
		}
		
		getNextMatchingSibling(isMatching: SegmentFilterFunction)
		{
			let segment = this;
			while ((segment = segment.nextSibling) != null)
			{
				if (isMatching(segment))
					return segment;
			}
			return null;
		}
		
		getPrevMatchingSibling(isMatching: SegmentFilterFunction)
		{
			let segment = this;
			while ((segment = segment.prevSibling) != null)
			{
				if (isMatching(segment))
					return segment;
			}
			return null;
		}
		
		toString()
		{
			return "[" + this.text + "]";	
		}
	}
}
