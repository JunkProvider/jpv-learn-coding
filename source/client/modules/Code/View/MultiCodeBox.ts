/// <reference path="CodeContainer" />

module Code.View
{
	export class MultiCodeBox
	{
		private selection: JQuery;
		private languageService: Language.LanguageService;
		private codeContainersByLanguageNames = new JPV.Collection.Map<CodeContainer>();
		private buttonsByLanguageNames = new JPV.Collection.Map<JQuery>();
		
		constructor(selection: JQuery, languageService: Language.LanguageService)
		{
			this.selection = selection;
			this.languageService = languageService;
			
			this.initialize();
		}
		
		initialize()
		{
			const _this = this;
			
			const $codeBoxHead = this.selection.find(".code-box-head");
			let first = true;
			this.selection.find(".code-box-script").each(function() {
				let $codeContainer = $(this);
				let languageName = <string><any>$codeContainer.data("title");
				let language = _this.languageService.getLanguageByName(languageName);
				
				let codeContainer = new CodeContainer($codeContainer, language);
				codeContainer.setDisplayed(false);
				
				_this.codeContainersByLanguageNames.add(languageName, codeContainer);

				// JQuery does not get which .text i want to call
				let $button = (<any>$("<div>"))
					.addClass("code-box-button")
					.text(languageName)
					.appendTo($codeBoxHead);
				
				_this.buttonsByLanguageNames.add(languageName, $button);

				$button.on("click", function() {
					let $clickedButton = $(this);
					let clickedButtonLanguageName = $button.text();
					
					// Set only the clicked button to 'pressed'
					_this.buttonsByLanguageNames.forEach(($button, languageName) => {
						$button.toggleClass("pressed", languageName == clickedButtonLanguageName);
					});
					
					// Show only the code which belongs to the clicked button
					_this.codeContainersByLanguageNames.forEach((codeContainer, languageName) => {
						codeContainer.setDisplayed(languageName == clickedButtonLanguageName);
					});
				});
			});
			
			this.buttonsByLanguageNames.toArray()[0].trigger("click");
		}
	}
}