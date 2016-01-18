module Application.Code
{	
	export class Stream
	{
		static createFromString(value: string)
		{
			const chars: number[] = [];
			for (let i = 0; i < value.length; i++)
			{
				chars.push(value.charCodeAt(i));	
			}
			return new Stream(chars);
		}

		chars: number[];
		index = 0;
		length: number;
		lastIndex: number;

		constructor(chars: number[])
		{
			this.chars = chars;
			this.length = chars.length;
			this.lastIndex = this.length - 1;
		}
		
		eos()
		{
			return this.index > this.lastIndex;	
		}

		peek(offset = 0)
		{
			const index = this.index + offset;
			if (index < 0 || index > this.lastIndex)
				return -1;
			
			return this.chars[index];		
		}
	
		read()
		{
			if (this.index > this.lastIndex)
				return -1;
			
			return this.chars[this.index++];	
		}
		
		readMultiple(count: number)
		{
			const start = this.index;
			this.index += count;
			return this.chars.slice(start, start + count);
		}
	}
}
