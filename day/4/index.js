const getInput = require("../../util/getInput");

const isEngulfed = (smallRange, largeRange) => {
	const isSmallRangeMinGreater = smallRange.min >= largeRange.min;
	const isSmallRangeMaxLesser = smallRange.max <= largeRange.max;
	return isSmallRangeMinGreater && isSmallRangeMaxLesser;
};

const testIsEngulfing = pair => {
	const { smallRange, largeRange } = [pair[1]].reduce(
		(leftRange, rightRange) => {
			if (leftRange.range < rightRange.range) {
				return {
					smallRange: leftRange,
					largeRange: rightRange,
				};
			} else {
				return {
					smallRange: rightRange,
					largeRange: leftRange,
				};
			}
		},
		pair[0]
	);
	return isEngulfed(smallRange, largeRange);
};

const testIsOverlapping = pair => {
	const [smallerMinRange, largerMinRange] = pair.sort(
		(a, b) => a.min - b.min
	);
	if (smallerMinRange.max >= largerMinRange.min) return true;
};

getInput(4).then(i => {
	const input = i.split("\n");

	/*
		parse input into pairs of section ranges
		as explained: https://adventofcode.com/2022/day/4#part1
	*/
	const pairs = input.map(pair => {
		const sections = pair.split(",");

		const leftRange = sections[0].split("-");
		const rightRange = sections[1].split("-");
		const leftMin = parseInt(leftRange[0]);
		const leftMax = parseInt(leftRange[1]);

		const rigthMin = parseInt(rightRange[0]);
		const rigthMax = parseInt(rightRange[1]);
		return [
			{
				min: leftMin,
				max: leftMax,
				range: Math.abs(leftMin - leftMax),
			},
			{
				min: rigthMin,
				max: rigthMax,
				range: Math.abs(rigthMin - rigthMax),
			},
		];
	});

	let isEngulfingCounter = 0;
	for (const pair of pairs) if (testIsEngulfing(pair)) ++isEngulfingCounter;
	console.log(isEngulfingCounter);

	let isOverlappingCounter = 0;
	for (const pair of pairs)
		if (testIsOverlapping(pair)) ++isOverlappingCounter;
	console.log(isOverlappingCounter);
});
