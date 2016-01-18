/// <reference path="Segment" />

module Application.Code
{
	export interface IFormatter
	{
		format(segments: Segment[]): string;
	}
}
