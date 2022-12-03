const getInput = require("../../util/getInput");

// Upper and lower case letters a-z/A-Z
const alphabet = String.fromCharCode(...Array(123).keys()).slice(97);
const lettersLowerCase = alphabet.split("");
const lettersUpperCase = lettersLowerCase.map(letter =>
	letter.toUpperCase(letter)
);

/*
    Assign priority to each upper/lower-case letter in the alphabet as per instructions:
    https://adventofcode.com/2022/day/3
*/
const getPriority = LETTER => {
	let addNum = 1;
	if (lettersUpperCase.includes(LETTER)) addNum = 27;

	const letter = LETTER.toLowerCase();
	for (let i = 0; i < lettersLowerCase.length; i++) {
		if (letter === lettersLowerCase[i]) return i + addNum;
	}
};

/*
    Check both compartments of the rucksack,
    compare items between compartments andreturn the priority of shared items
*/
const inspectRucksack = rucksack => {
	const half = Math.floor(rucksack.length / 2);
	const compartments = [
		rucksack.slice(0, half).split(""),
		rucksack.slice(half, rucksack.length).split(""),
	];

	// compare items between compartments, returning matches into an array
	const sharedItems = compartments[0].reduce((prev, item) => {
		const itemIsShared = compartments[1].includes(item);
		if (!itemIsShared || prev.includes(item)) return prev;
		return prev.concat(item);
	}, []);

	// attach priorities to the list of items
	const sharedItemsPriorities = sharedItems.map(item => {
		return {
			type: item,
			priority: getPriority(item),
		};
	});

	return {
		items: sharedItemsPriorities,
		total: sharedItemsPriorities.reduce(
			(prev, curr) => (prev += curr.priority),
			0
		),
	};
};

// part 2
const makeElfGroups = (arr, size = 3) => {
	const batches = [];
	for (let i = 0; i < arr.length; i += size) {
		batches.push(arr.slice(i, i + size));
	}
	return batches;
};

/* 
    search through the group of elves' rucksacks
    to find the item shared between all of them
*/
const identifyGroup = rucksacks => {
	return (
		rucksacks
			// split the rucksack into individual items
			.map(rucksack => rucksack.split(""))
			// take the first rucksack
			.shift()
			// find within the first rucksack
			.find(item =>
				// if item exists within all 3 rucksacks, return it
				rucksacks.every(rucksack => rucksack.indexOf(item) !== -1)
			)
	);
};

getInput(3).then(i => {
	const rucksacks = i.split("\n");

	const part1 = () => {
		// Inspect and prioritize matching contents between compartments
		const contents = rucksacks.map(inspectRucksack);
		const sumPriorities = contents.reduce(
			(prev, curr) => (prev += curr.total),
			0
		);
		// Part 1 answer:
		console.log(sumPriorities);
	};

	const part2 = () => {
		// split elves up into groups of 3
		const groups = makeElfGroups(rucksacks, 3);
		// find matching items between the groups of elves' rucksacks
		const groupIdentifier = groups.map(identifyGroup);

		// Attach priorities to badges
		const priorities = groupIdentifier.map(identifier => {
			return {
				identifier,
				priority: getPriority(identifier),
			};
		});
		const sumPriorities = priorities.reduce(
			(prev, curr) => (prev += curr.priority),
			0
		);
		// Part 2 answer:
		console.log(sumPriorities);
	};
	part2();
});
