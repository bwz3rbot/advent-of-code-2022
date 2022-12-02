const getInput = require("../../util/getInput");
const TYPE = {
	ROCK: { NAME: "ROCK", SCORE: 1, BEATS: "SCISSORS", LOSES: "PAPER" },
	PAPER: { NAME: "PAPER", SCORE: 2, BEATS: "ROCK", LOSES: "SCISSORS" },
	SCISSORS: { NAME: "SCISSORS", SCORE: 3, BEATS: "PAPER", LOSES: "ROCK" },
};

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
const findTypeByName = name => {
	const entries = Object.entries(TYPE);
	return entries.find(([k, v]) => k === name)[1];
};
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

const getTurnScore = (a, b) => {
	if (a.NAME === b.NAME) {
		return [3 + a.SCORE, 3 + b.SCORE];
	}
	if (a.BEATS === b.NAME) return [a.SCORE + 6, b.SCORE];
	if (a.LOSES === b.NAME) return [a.SCORE, b.SCORE + 6];
};

const getMyScore = strategy => {
	const scores = strategy.map(match => getTurnScore(match[0], match[1]));
	const myTotalScore = scores.reduce((prev, score) => {
		return (prev += score[1]);
	}, 0);
	return myTotalScore;
};
getInput(2).then(i => {
	const input = i.split("\n");
	const strategy = input.map(match => {
		const playerTurns = match.split(" ");
		return [
			getRockPaperScissors(playerTurns[0]),
			getRockPaperScissors(playerTurns[1]),
		];
	});

	const myTotalScore = getMyScore(strategy);
	// Part 1 answer:
	console.log(myTotalScore);

	const correctStrategy = input.map((match, i) => {
		const playerTurns = match.split(" ");
		const opponent = getRockPaperScissors(playerTurns[0]);
		const myTurn = getMyTurnType(opponent, playerTurns[1]);
		return [opponent, myTurn];
	});

	const myCorrectTotalScore = getMyScore(correctStrategy);
	console.log(myCorrectTotalScore);
});
