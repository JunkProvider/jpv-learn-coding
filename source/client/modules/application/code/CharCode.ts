module Application.Code
{
	export class CharCode
	{
		static SCORE = CharCode.fromString('_');
		static DOT = CharCode.fromString('.');
		static MINUS = CharCode.fromString('-');
		static SLASH = '/'.charCodeAt(0);
		static ASTERISK = '*'.charCodeAt(0);
		static SINGLE_QUOTE = '\''.charCodeAt(0);	
		static DOUBLE_QUOTE = '"'.charCodeAt(0);
		static LINE_BREAK = '\n'.charCodeAt(0);
		static TAB = '\t'.charCodeAt(0);
		static SPACE = ' '.charCodeAt(0);
		
		static ZERO = CharCode.fromString('0');
		static NINE = CharCode.fromString('9');
		
		static a = CharCode.fromString('a');
		static f = CharCode.fromString('f');
		static z = CharCode.fromString('z');
		
		static A = CharCode.fromString('A');
		static Z = CharCode.fromString('Z');
		
		static isAlphanumeric(charCode: number)
		{
			return CharCode.isNumber(charCode) || CharCode.isLetter(charCode);
		}
		
		static isNumber(charCode: number)
		{
			return charCode >= CharCode.ZERO && charCode <= CharCode.NINE;
		}
		
		static isLetter(charCode: number)
		{
			return (charCode >= CharCode.a && charCode <= CharCode.z) || (charCode >= CharCode.A && charCode <= CharCode.Z);	
		}
		
		static isLowerCase(charCode: number)
		{
			return charCode >= CharCode.a && charCode <= CharCode.z;	
		}
		
		static isUpperCase(charCode: number)
		{
			return charCode >= CharCode.A && charCode <= CharCode.Z;	
		}
		
		static fromString(value: string)
		{
			return value.charCodeAt(0);	
		}
	}
}
