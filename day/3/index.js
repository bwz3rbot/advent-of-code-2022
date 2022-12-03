const getInput = require("../../util/getInput");

// Upper and lower case letters a-z/A-Z
const alphabet = String.fromCharCode(...Array(123).keys()).slice(97);
const lettersLowerCase = alphabet.split("");
const lettersUpperCase = lettersLowerCase.map(letter =>
	letter.toUpperCase(letter)
);

// Test if char is uppercase / lowercase
const isUpperCase = char => (char === char.toUpperCase() ? true : false);

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

getInput(3).then(i => {
	const rucksacks = i.split("\n");
	const contents = rucksacks.map(inspectRucksack);
	const sumPriorities = contents.reduce(
		(prev, curr) => (prev += curr.total),
		0
	);
	console.log(sumPriorities);
});
