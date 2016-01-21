/// <reference path="../Lexer/Lexer" />
/// <reference path="../Interpreter/JavaInterpreter" />
/// <reference path="../Interpreter/TypescriptInterpreter" />
/// <reference path="../Formatter/JavaFormatter" />
/// <reference path="Language" />
/// <reference path="Keywords" />
/// <reference path="Operators" />

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
					"<?php": "red",
				},
				keywordTitles: {
				},
				specialCharTitles: {
				}
			});
			
			{
				const interpreter = new Interpreter.JavaInterpreter(
					[],
					[ '=', '+', '-', '*', '/', '^' ]
				);
				const language = new Language("math", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
		
			{
				const interpreter = new Interpreter.JavaInterpreter(Keywords.JAVA, Operators.JAVA);
				const language = new Language("java", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const interpreter = new Interpreter.JavaInterpreter(Keywords.CS, Operators.CS);
				const language = new Language("c#", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const lexer = new Lexer.Lexer([
					Lexer.SequenceFinder.createFromStringArray(
						[ "<?php", "&lsaquo;?php", "<?php" ], Lexer.LexerHint.STRING
					),
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
				const interpreter = new Interpreter.JavaInterpreter(Keywords.PHP, Operators.PHP);
				const language = new Language("php", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const interpreter = new Interpreter.JavaInterpreter(Keywords.JS, Operators.JS);
				const language = new Language("js", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const interpreter = new Interpreter.TypescriptInterpreter(Keywords.TS, Operators.TS);
				const language = new Language("ts", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const interpreter = new Interpreter.JavaInterpreter(Keywords.SH, Operators.SH);
				const language = new Language("sh", lexer, interpreter, formatter);
				this.languagesByNames.add(language.name, language);
			}
			{
				const interpreter = new Interpreter.JavaInterpreter(Keywords.JASS, Operators.JASS);
				const language = new Language("jass", lexer, interpreter, formatter);
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
