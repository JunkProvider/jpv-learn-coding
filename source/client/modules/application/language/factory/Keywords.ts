module Application_Old.Language.Factory
{
	export class Keywords
	{
		static JAVA_AND_CS = [
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
		];
		
		static JAVA = Keywords.JAVA_AND_CS;
		static CS = Keywords.JAVA_AND_CS;
		
		static PHP = [
			"echo",
			"true",
			"false",
			"if",
			"else",
			"switch",
			"case",
			"default",
			"for",
			"foreach",
			"as",
			"public",
			"protected",
			"private",
			"function",
			"return",
			"new",
			"class",
		];
		
		static JS = [
			"var",
			"true",
			"false",
			"if",
			"else",
			"switch",
			"case",
			"default",
			"for",
			"in",
			"function",
			"return",
			"new",
		];
		
		static TS = [
			"var",
			"let",
			"const",
			"true",
			"false",
			"if",
			"else",
			"switch",
			"case",
			"default",
			"for",
			"in",
			"of",
			"public",
			"protected",
			"private",
			"function",
			"return",
			"new",
			"class",
			"get",
			"set",
		];
		
		static SH = [
			"echo",
			"if",
			"then",
			"else",
			"fi",
			"while",
			"do",
			"done",
		];
		
		static JASS = [
			"local",
			"array",
			"set",
			"true",
			"false",
			"if",
			"then",
			"else",
			"endif",
			"loop",
			"exitwhen",
			"endloop",
			"call",
			"function",
			"takes",
			"returns",
			"return",
			"endfunction",
			"public",
			"private",
			"static",
			"struct",
			"method",
			"endmethod",
		];
	}
}
