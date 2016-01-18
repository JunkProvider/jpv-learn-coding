/// <reference path="../Lexer/Lexer" />

module Code.Language
{
	export class LanguageService
	{
		private languagesByNames = new JPV.Collection.Map<ILanguage>();
		
		constructor()
		{
			const lexer = new Lexer.Lexer([
				new Lexer.MultiLineCommentFinder(),
				new Lexer.SingleLineCommentFinder(),
				new Lexer.StringLiteralFinder(),
				new Lexer.NumberLiteralFinder(),
				new Lexer.WordFinder(),
				Lexer.SymbolFinder.createFromStringArray(
					[' ', '\n', '\t'], Lexer.LexerHint.WHITESPACE
				),
				Lexer.SequenceFinder.createFromStringArray(
					[
						"+=", "-=", "*=", "/=", "++", "--",
						"==", "!=", "<=", ">=",
						"===", "!==", "->",
					],
					Lexer.LexerHint.SPECIAL_CHAR
				),
				Lexer.SymbolFinder.createFromString(
					".;=+-*/&|!<>{}()[]$:", Lexer.LexerHint.SPECIAL_CHAR
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
			
			const interpreter = new Interpreter.JavaInterpreter(
				[
					"true",
					"false",
					"if",
					"else",
					"switch",
					"case",
					"default",
					"for",
					"foreach",
					"in",
					"public",
					"protected",
					"private",
					"return",
					"new",
					"class",
				],
				[
					"=",
					"+",
					"-",
					"*",
					"/",
					"+=",
					"-=",
					"*=",
					"/=",
					"==",
					"!=",
					"<",
					">",
					"<=",
					">=",
					"||",
					"&&",
					"!",
					".",
				]
			);
			const language = new Language("java", lexer, interpreter, formatter);
			this.languagesByNames.add(language.name, language);
			
			/*{
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
			}*/
		}

		getAllLanguages()
		{
			return this.languagesByNames.toArray();	
		}
		
		getLanguageByName(name: string)
		{
			return this.languagesByNames.get("java");
			
			if (!this.languagesByNames.contains(name))
				throw new RangeError("Could not get language. No language with name \"" + name + "\" found.");	
			
			return this.languagesByNames.get(name);
		}
	}
}
