/// <reference path="../../Common/CharCode" />
/// <reference path="../Lexer/LexerHint" />
/// <reference path="../Interpreter/InterpreterHint" />

module Code.Formatter
{
	export interface JavaFormatterOptions
	{
		commentColor: string;
		stringLiteralColor: string;
		numberLiteralColor: string;
		typeColor: string;
		variableColor: string;
		functionColor: string;
		defaultKeywordColor: string;
		keywordColors: JPV.Collection.IndexedObject<string>;
		keywordTitles: JPV.Collection.IndexedObject<string>;
		specialCharTitles: JPV.Collection.IndexedObject<string>;
	}
	
	export class JavaFormatter implements IFormatter
	{
		private options: JavaFormatterOptions;
		
		constructor(options: JavaFormatterOptions)
		{
			this.options = options;
		}
		
		format(segments: Lexer.Segment[])
		{
			let html = "";
			for (const segment of segments)
			{
				html += this.formateSegment(segment);	
			}
			return html;
		}
		
		formateSegment(segment: Lexer.Segment)
		{
			const options = this.options;
			const text = segment.text;
			
			switch (segment.interpreterHint)
			{
				case Interpreter.InterpreterHint.TYPE:
					return this.span(segment, options.typeColor, "Typ");
				case Interpreter.InterpreterHint.VARIABLE:
					return this.span(segment, options.variableColor, "Variable (Bezeichner)");
				case Interpreter.InterpreterHint.FUNCTION:
					return this.span(segment, options.functionColor, "Funktion");
				case Interpreter.InterpreterHint.KEYWORD:
				{
					let color = options.keywordColors[text];
					if (color == undefined)
					{
						color = options.defaultKeywordColor;
					}
					/*let title = options.keywordTitles[text];
					if (title == undefined)
					{
						title = null;	
					}*/
					return this.span(segment, color, "Schlüsselwort");
				}
				case Interpreter.InterpreterHint.OPERATOR:
					return this.span(segment, "", "Operator");
				case Interpreter.InterpreterHint.SPECIAL_CHAR:
					return this.span(segment, "", "Sonderzeichen");
			}
			
			switch (segment.lexerHint)
			{
				case Lexer.LexerHint.NONE:
					return text;
				case Lexer.LexerHint.WHITESPACE:
				{
					const charCode = segment.chars[0];
					switch (charCode)
					{
						case Common.CharCode.SPACE:
							return "&nbsp";
						case Common.CharCode.LINE_BREAK:
							return "<br/>";
						case Common.CharCode.TAB:
							return "<span class=\"tab\"></span>";
						default:
							return text;	
					}	
				}
				case Lexer.LexerHint.COMMENT:
					return this.span(segment, options.commentColor, "Kommentar");
				case Lexer.LexerHint.STRING:
					return this.span(segment, options.stringLiteralColor, "Zeichenkette");
				case Lexer.LexerHint.NUMBER:
					return this.span(segment, options.numberLiteralColor, "Zahl");
				default:
					return text;
			}
		}
		
		private span(segment: Lexer.Segment, color: string, title: string = null)
		{
			return this.getTagString(
				"span",
				{
					"class": "segment",
					"title": title,
					"style": this.getStyleString({
						"color": color
					}),
					"data-lexer-hint": segment.lexerHint.toString(),
					"data-interpreter-hint": segment.interpreterHint.toString()
				},
				segment.text
			);	
		}
		
		private getTagString(tag: string, attributes: JPV.Collection.IndexedObject<string>, text: string = "")
		{
			const attributeStrings: string[] = [];
			for (let key in attributes)
			{
				const value = attributes[key];
				if (value != null)
				{
					attributeStrings.push(key + '="' + value + '"');
				}
			}
			const atributesString = attributeStrings.join(' ');
			return '<' + tag + ' ' + atributesString + '>' + text + '</' + tag + '>';
		}
		
		private getStyleString(styles: JPV.Collection.IndexedObject<string>)
		{
			const styleStrings: string[] = [];
			for (let key in styles)
			{
				const value = styles[key];
				if (value != null)
				{
					styleStrings.push(key + ': ' + styles[key] + ';');	
				}
			}
			return styleStrings.join(' ');
		}
	}
}
