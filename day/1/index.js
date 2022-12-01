// Read file input and replace all /r and /n characters
const getInput = async day => {
	const path = require("path");
	const fs = require("fs/promises");
	return (await fs.readFile(path.join("day", day, "input.txt"), "utf8"))
		.replace(/\r\n/g, " ")
		.split(" ");
};

/* Create a multidimensional array by iterating the rows and
	if an empty string is found, create a new group. */
const makeGroups = array => {
	const groups = [];
	let group = [];
	array.forEach(value => {
		if (value === "") {
			groups.push(group);
			group = [];
		} else {
			group.push(value);
		}
	});
	groups.push(group);
	return groups;
};
(async () => {
	// Read the file
	const input = await getInput("1");

	// Create groups
	const groups = makeGroups(input);

	const countTotalCaloriesCarried = itemsCarried =>
		itemsCarried.reduce((prev, curr) => {
			return (prev += parseInt(curr));
		}, 0);

	/* Count the total number of calories per group.
	If the total number of calories exceeds the previous total number of calories,
	make that the largest total until the entire list has been evaluated. */
	let largestTotalCarriedCalories = 0;
	const findLargestTotalCaloriesCarried = itemsCarried => {
		const totalCaloriesCarried = countTotalCaloriesCarried(itemsCarried);
		if (totalCaloriesCarried > largestTotalCarriedCalories)
			largestTotalCarriedCalories = totalCaloriesCarried;
	};

	// Iterate the groups and find the largest total number of calories
	for (const group of groups) findLargestTotalCaloriesCarried(group);

	// Part 1 Answer:
	console.log(largestTotalCarriedCalories);

	/* Count the total number of calories carried in a given group to find the top three
	greatest total of calories carried by any given elf */
	let topThree = [0, 0, 0];
	const findTopThreeLargestCalories = itemsCarried => {
		const totalCaloriesCarried = countTotalCaloriesCarried(itemsCarried);
		topThree = topThree.sort((a, b) => a - b);
		if (totalCaloriesCarried > topThree[0])
			topThree[0] = totalCaloriesCarried;
	};

	// Iterate the groups to find the top three largest calories carried
	for (const group of groups) findTopThreeLargestCalories(group);

	// Count the total number of calories carried by the top three
	const totalCarriedBetweenTopThree = topThree.reduce(
		(prev, curr) => (prev += curr),
		0
	);

	// Part 2 Answer:
	console.log(totalCarriedBetweenTopThree);
})();
