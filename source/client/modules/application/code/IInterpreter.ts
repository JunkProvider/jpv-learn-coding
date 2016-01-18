/// <reference path="Segment" />

module Application.Code
{
	export interface IInterpreter
	{
		interpret(segments: Segment[]): void;
	}
}
