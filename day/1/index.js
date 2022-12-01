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

	/* Count the total number of calories per group.
	If the total number of calories exceeds the previous total number of calories,
	make that the largest total until the entire list has been evaluated. */
	let largestTotalCarriedCalories = 0;
	const handleGroup = itemsCarried => {
		const totalCaloriesCarried = itemsCarried.reduce((prev, curr) => {
			return (prev += parseInt(curr));
		}, 0);
		if (totalCaloriesCarried > largestTotalCarriedCalories)
			largestTotalCarriedCalories = totalCaloriesCarried;
	};

	// Iterate the groups and find the largest total number of calories
	for (const group of groups) handleGroup(group);
	console.log(largestTotalCarriedCalories);
})();
