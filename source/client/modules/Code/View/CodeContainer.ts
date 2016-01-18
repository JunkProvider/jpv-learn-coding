module Code.View
{
	export class SegmentData
	{
		constructor(
			public text: string,
			public lexerHint: Lexer.LexerHint,
			public interpreterHint: Interpreter.InterpreterHint
		)
		{};	
	}
	
	export class CodeContainer
	{
		segmentClickedEvent = new JPV.Event.Event<SegmentData>();
		
		private selection: JQuery;
		private language: Language.ILanguage;
		
		constructor(selection: JQuery, language: Language.ILanguage)
		{
			this.selection = selection;
			this.language = language;
			
			this.initialize();
		}
		
		initialize()
		{
			const _this = this;
			
			let text = this.selection.text();
			text = text.substring(1, text.length - 2);
			var lines = text.split('\n');

			var minTabs: number = null;
			for (var i = 0; i < lines.length; i++)
			{
				var line = lines[i];
				if (line.trim() == "")
				{
					continue;
				}
				var tabs = 0;
				for (var j = 0; j < line.length; j++)
				{
					if (line[j] == '\t')
					{
						tabs++;
					}
					else
					{
						break;
					}
				}
				if (minTabs == null || tabs < minTabs)
				{
					minTabs = tabs;
				}
			}
			for (var i = 0; i < lines.length; i++)
			{
				lines[i] = lines[i].substring(minTabs, lines[i].length);
			}
			text = lines.join('\n');

			var segments = this.language.getLexer().lex(text);
			this.language.getInterpreter().interpret(segments);
			const html = this.language.getFormatter().format(segments);

			this.selection.html(html);
			
			this.selection.on("click", ".segment", function() {
				const InterpreterHint = Code.Interpreter.InterpreterHint
				
				const $segment = $(this);
				const lexerHint: Code.Lexer.LexerHint = parseInt(<string><any>$segment.data("lexer-hint"));
				const interpreterHint: Code.Interpreter.InterpreterHint = parseInt(<string><any>$segment.data("interpreter-hint"));
				
				if (interpreterHint != InterpreterHint.NONE)
				{
					if (interpreterHint == InterpreterHint.TYPE)
					{
						alert("type");	
					}	
				}
				
				_this.segmentClickedEvent.trigger(this, new SegmentData($segment.text(), lexerHint, interpreterHint));
			});
		}
		
		setDisplayed(displayed: boolean)
		{
			this.selection.css("display", displayed ? "" : "none");	
		}
	}
}