/// <reference path="../Code/Language/LanguageService" />
/// <reference path="../Code/View/MultiCodeBox" />

module Application
{
	export class Application
	{
		private languageService: Code.Language.LanguageService;
		
		constructor()
		{
			this.languageService = new Code.Language.LanguageService();
		}
		
		run()
		{
			const _this = this;
			
			$(".single-code-box").each(function() {
				const $codeContainer = $(this).find(".code-box-script");
				const languageName = <string><any>$codeContainer.data("title");
				const language = _this.languageService.getLanguageByName(languageName);
				new Code.View.CodeContainer($codeContainer, language);
			});
			
			$(".multi-code-box").each(function() {
				const $codeBox = $(this);
				new Code.View.MultiCodeBox($codeBox, _this.languageService);
			});
		}
	}
}
