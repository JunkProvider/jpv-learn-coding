/// <reference path="language/LanguageService" />

module Application
{
	export class Application
	{
		private languageService: Language.LanguageService;
		
		constructor()
		{
			this.languageService = new Language.LanguageService();
		}
		
		run()
		{
			const _this = this;
			
			$(".code-box-script").each(function() {
				var $codeBoxScript = $(this);
				var language = <string><any>$codeBoxScript.data("title");
				if (language == undefined)
				{
					language = "java";	
				}
				var text = $codeBoxScript.text();
				var html = _this.formatCode(text, language);

				$codeBoxScript.html(html);
			});

			$(".multi-code-box").each(function() {
				var $codeBox = $(this);
				var $codeBoxHead = $codeBox.find(".code-box-head");
				var first = true;
				$codeBox.find(".code-box-script").each(function() {
					var $codeBoxScript = $(this);

					$codeBoxScript.css("display", "none");

					// JQuery does not get which .text i want to call
					var $codeBoxButton = (<any>$("<div>"))
						.addClass("code-box-button")
						.text(<String><any>$codeBoxScript.data("title"))
						.appendTo($codeBoxHead);

					$codeBoxButton.on("click", function() {
						var $codeBoxButton = $(this);
						var $codeBox = $codeBoxButton.closest(".multi-code-box");
						var $codeBoxScripts = $codeBox.find(".code-box-script");

						$codeBox.find(".code-box-button").toggleClass("pressed", false);
						$codeBoxButton.toggleClass("pressed", true);

						$codeBoxScripts.each(function() {
							$codeBoxScript = $(this);
							$codeBoxScript.css("display", <string><any>$codeBoxScript.data("title") == $codeBoxButton.text() ? "" : "none");
						});
					});

					if (first)
					{
						$codeBoxButton.trigger("click");
						first = false;
					}
				});
			});
			
			$(".code-box-script").on("click", ".segment", function() {
				const InterpreterHint = Code.Interpreter.InterpreterHint
				
				const $segment = $(this);
				const interpreterHint: Code.Interpreter.InterpreterHint = parseInt(<string><any>$segment.data("interpreter-hint"));
				
				if (interpreterHint != InterpreterHint.NONE)
				{
					if (interpreterHint == InterpreterHint.TYPE)
					{
						alert("type");	
					}	
				}	
			});
		}
			
		private formatCode(text: string, languageName: string)
		{
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

			const language = this.languageService.getLanguageByName(languageName);
			
			var segments = language.getLexer().lex(text);
			language.getInterpreter().interpret(segments);
			var formattedCode = language.getFormatter().format(segments);

			return formattedCode;
		}
	}
}
