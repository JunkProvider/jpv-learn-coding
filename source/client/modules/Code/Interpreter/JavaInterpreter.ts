/// <reference path="../../Common/CharCode" />
/// <reference path="../Lexer/LexerHint" />
/// <reference path="InterpreterHint" />

module Code.Interpreter
{
	export class JavaInterpreter implements IInterpreter
	{
		private keywords: JPV.Collection.Map<string>;
		private operators: JPV.Collection.Map<string>;
		
		constructor(keywords: string[], operators: string[])
		{
			this.keywords = JPV.Collection.Map.createFromArray(
				keywords,
				(keyword) => keyword
			);
			this.operators = JPV.Collection.Map.createFromArray(
				operators,
				(operator) => operator
			);
		}
		
		interpret(segments: Lexer.Segment[])
		{
			for (const segment of segments)
			{
				if (segment.lexerHint == Lexer.LexerHint.WORD)
				{
					segment.interpreterHint = this.interpretWord(segment);
					continue;	
				}
				if (segment.lexerHint == Lexer.LexerHint.SPECIAL_CHAR)
				{
					segment.interpreterHint = this.interpretSpecialChar(segment);
					continue;	
				}
			}
		}
		
		private interpretSpecialChar(segment: Lexer.Segment)
		{
			const text = segment.text;
			
			if (this.operators.contains(text))
				return InterpreterHint.OPERATOR;
			
			return InterpreterHint.SPECIAL_CHAR;
		}
		
		private interpretWord(segment: Lexer.Segment)
		{
			const text = segment.text;
			
			if (this.keywords.contains(text))
			{
				return InterpreterHint.KEYWORD;
			}
			
			const prev = segment.getPrevRelevantSibling();
			const prevText = prev != null ? prev.text : "";
			const prevHint = prev != null ? prev.lexerHint : Lexer.LexerHint.NONE;
			
			const next = segment.getNextRelevantSibling();
			const nextText = next != null ? next.text : "";
			const nextHint = next != null ? next.lexerHint : Lexer.LexerHint.NONE;
			
			if (prevText == "new")
				return InterpreterHint.TYPE;

			if (nextHint == Lexer.LexerHint.WORD)
				return InterpreterHint.TYPE;
			
			if (nextText == '(')
				return InterpreterHint.FUNCTION;
			
			if (nextText == '[')
			{
				const nextButOne = next.getNextRelevantSibling();
				if (nextButOne != null && nextButOne.text == ']')
					return InterpreterHint.TYPE;
			}
			
			if (Common.CharCode.isUpperCase(segment.chars[0]))
				return InterpreterHint.TYPE;
			
			return InterpreterHint.VARIABLE;
		}
	}
}
