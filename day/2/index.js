// read the input.txt file
const getInput = require("../../util/getInput");

// rock/paper/scissors (R/P/S)
const TYPE = {
	ROCK: { NAME: "ROCK", SCORE: 1, BEATS: "SCISSORS", LOSES: "PAPER" },
	PAPER: { NAME: "PAPER", SCORE: 2, BEATS: "ROCK", LOSES: "SCISSORS" },
	SCISSORS: { NAME: "SCISSORS", SCORE: 3, BEATS: "PAPER", LOSES: "ROCK" },
};

// used for part 1 before the stinky elf ran off without giving me complete directions!
// *its okay, we can still use it for part 2*
const getRockPaperScissors = letter => {
	switch (letter) {
		case "A":
		case "X":
			return TYPE.ROCK;
		case "B":
		case "Y":
			return TYPE.PAPER;
		case "C":
		case "Z":
			return TYPE.SCISSORS;
	}
};

// nice little helper method to search an object by key name
const findTypeByName = name => {
	const entries = Object.entries(TYPE);
	return entries.find(([k, v]) => k === name)[1];
};

// used for part 2 in finding which type(R/P/S) I should throw for a given match
const getMyTurnType = (opponent, mySignal) => {
	switch (mySignal) {
		case "X":
			return findTypeByName(opponent.BEATS);

		case "Y":
			return findTypeByName(opponent.NAME);

		case "Z":
			return findTypeByName(opponent.LOSES);
	}
};

// scoring as outlined here: https://adventofcode.com/2022/day/2
const getTurnScore = (a, b) => {
	if (a.NAME === b.NAME) {
		return [3 + a.SCORE, 3 + b.SCORE];
	}
	if (a.BEATS === b.NAME) return [a.SCORE + 6, b.SCORE];
	if (a.LOSES === b.NAME) return [a.SCORE, b.SCORE + 6];
};

// calculate my total score for a list of matches
const getMyScore = strategy => {
	const scores = strategy.map(match => getTurnScore(match[0], match[1]));
	const myTotalScore = scores.reduce((prev, score) => {
		return (prev += score[1]);
	}, 0);
	return myTotalScore;
};

getInput(2).then(i => {
	const input = i.split("\n");

	// create a list of turns (p1:R/P/S, p2:R/P/S)
	const strategy = input.map(match => {
		const playerTurns = match.split(" ");
		return [
			getRockPaperScissors(playerTurns[0]),
			getRockPaperScissors(playerTurns[1]),
		];
	});

	// Part 1 answer:
	const myTotalScore = getMyScore(strategy);
	console.log(myTotalScore);

	// create a list of turns with the CORRECT strategy (part 2)
	const correctStrategy = input.map((match, i) => {
		const playerTurns = match.split(" ");
		const opponent = getRockPaperScissors(playerTurns[0]);
		const myTurn = getMyTurnType(opponent, playerTurns[1]);
		return [opponent, myTurn];
	});

	// Part 2 answer:
	const myCorrectTotalScore = getMyScore(correctStrategy);
	console.log(myCorrectTotalScore);
});
