module Application_Old
{
	export class Operators
	{
		static BASIC = [
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
		];
		
		static JAVA = Operators.BASIC;
		static CS = Operators.BASIC;
		
		static PHP = Operators.BASIC.concat(["->"]);
		
		static JS = Operators.BASIC;
		static TS = Operators.BASIC;
		
		static SH = [
			"=",
		];
		
		static JASS = [
			"=",
			"+",
			"-",
			"*",
			"/",
			"==",
			"!=",
			"<",
			">",
			"<=",
			">=",
			".",
		];
	}
}
