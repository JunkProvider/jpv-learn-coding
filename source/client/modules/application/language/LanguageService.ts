/// <reference path="../code/Lexer" />
/// <reference path="../code/formatter/JavaFormatter" />
/// <reference path="factory/JavaFactory" />
/// <reference path="factory/CSharpFactory" />
/// <reference path="factory/PHPFactory" />
/// <reference path="factory/JavascriptFactory" />
/// <reference path="factory/TypescriptFactory" />
/// <reference path="factory/ShellFactory" />
/// <reference path="factory/JassFactory" />

module Application.Language
{
	export class LanguageService
	{
		private languagesByNames = new JPV.Collection.Map<ILanguage>();
		
		constructor()
		{
			const lexer = new Code.Lexer([
				new Code.SegmentFinder.MultiLineCommentFinder(),
				new Code.SegmentFinder.SingleLineCommentFinder(),
				new Code.SegmentFinder.StringLiteralFinder(),
				new Code.SegmentFinder.NumberLiteralFinder(),
				new Code.SegmentFinder.WordFinder(),
				Code.SegmentFinder.SymbolFinder.createFromStringArray(
					[' ', '\n', '\t'], Code.LexerHint.WHITESPACE
				),
				Code.SegmentFinder.SequenceFinder.createFromStringArray(
					[
						"+=", "-=", "*=", "/=", "++", "--",
						"==", "!=", "<=", ">=",
						"===", "!==", "->",
					],
					Code.LexerHint.SPECIAL_CHAR
				),
				Code.SegmentFinder.SymbolFinder.createFromString(
					".;=+-*/&|!<>{}()[]$:", Code.LexerHint.SPECIAL_CHAR
				),
			]);
		
			const formatter = new Code.Formatter.JavaFormatter({
				commentColor: "#8DB553",
				stringLiteralColor: "#4A93D1",
				numberLiteralColor: "#65B6CE",
				typeColor: "#A67DE0",
				variableColor: "#FFA500",
				functionColor: "#FFC600", //"#FFBA00",
				defaultKeywordColor: "grey",
				keywordColors: {
					"true": "#65B6CE",
					"false": "#65B6CE",
				},
				keywordTitles: {
				},
				specialCharTitles: {
				}
			});
			
			{
				const language = Factory.JavaFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.CSharpFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.PHPFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.JavascriptFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.TypescriptFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.ShellFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const language = Factory.JassFactory.createLanguage(lexer, formatter);
				this.languagesByNames.add(language.name, language);
			}
		}

		getAllLanguages()
		{
			return this.languagesByNames.toArray();	
		}
		
		getLanguageByName(name: string)
		{
			if (!this.languagesByNames.contains(name))
				throw new RangeError("Could not get language. No language with name \"" + name + "\" found.");	
			
			return this.languagesByNames.get(name);
		}
	}
}
