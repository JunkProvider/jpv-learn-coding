/// <reference path="Segment" />
/// <reference path="Stream" />

module Application.Code
{
	export interface ISegmentFinder
	{
		find(stream: Stream): Segment;
	}
}
