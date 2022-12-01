const getInput = async day => {
	const path = require("path");
	const fs = require("fs/promises");
	return (await fs.readFile(path.join("day", day, "input.txt"), "utf8"))
		.replace(/\r\n/g, " ")
		.split(" ");
};

(async () => {
	const input = await getInput("1");
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
	const groups = makeGroups(input);

	console.log(groups);

	let largestTotalCarriedCalories = 0;
	const handleGroup = itemsCarried => {
		const totalCaloriesCarried = itemsCarried.reduce((prev, curr) => {
			return (prev += parseInt(curr));
		}, 0);
		if (totalCaloriesCarried > largestTotalCarriedCalories)
			largestTotalCarriedCalories = totalCaloriesCarried;
	};
	for (let i = 0; i < groups.length; i++) handleGroup(groups[i], i);
	console.log(largestTotalCarriedCalories);
})();
