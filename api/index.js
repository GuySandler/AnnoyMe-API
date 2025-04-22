const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
	origin: "*", // Allow all origins (or specify a specific origin like 'http://yourdomain.com')
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Allow cookies or credentials
};

app.use(cors(corsOptions)); // Apply CORS middleware with custom options

app.use(express.json());
// add .env for questions
// const dotenv = require("dotenv");
// dotenv.config();
// future

// app.listen(3000, () => console.log("Server running on port 3000"));

const mathPuzzles = [
	{
		question: "What is 2 + 2?",
		id: 1,
		answer: 4,
	},
	{
		question: "What is 2 * (2/1.25)?",
		id: 2,
		answer: 3.2,
	},
	// make more in LATEX format
];

const Riddles = [
	{
		question:
			"I am invisible, yet you can see me. If you put me through a barrel, I make it lighter. What am I?",
		answer: "hole",
		id: 1,
	},
	{
		question: "What has ten letters and starts with gas?",
		answer: "automobile",
		id: 2,
	},
	{
		// what
		question:
			"There came a bird featherless and sat on the trees leafless. There came a maiden speechless and ate the bird featherless, from off the trees leafless. What is it?",
		answer: "snow",
		id: 3,
	},
	// make more original ones
];

const wordsToScramble = [
	// maybe add more idk
	{ word: "Hexakosioihexekontahexaphobia", id: 1 },
	{ word: "Antidisestablishmentarianism", id: 2 },
	{ word: "Pseudopseudohypoparathyroidism", id: 3 },
	{ word: "Supercalifragilisticexpialidocious", id: 4 },
];

function PickRandomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}
function scrambler(randWord) {
	return {
		word: randWord.word
			.split("")
			.sort(() => Math.random() - 0.5)
			.join(""),
		id: randWord.id,
	};
}

app.get("/api/math", (req, res) => {
	res.json(
		(() => {
			const randMath = PickRandomItem(mathPuzzles);
			return {
				question: randMath.question,
				id: randMath.id,
			};
		})()
	);
});
app.get("/api/riddlemethis", (req, res) => {
	res.json(
		(() => {
			const randRiddle = PickRandomItem(Riddles);
			return {
				question: randRiddle.question,
				id: randRiddle.id,
			};
		})()
	);
});
app.get("/api/unscramble", (req, res) => {
	res.json(
		(() => {
			const scrambled = scrambler(PickRandomItem(wordsToScramble));
			// console.log(scrambled);
			return {
				question: scrambled.word,
				id: scrambled.id,
			};
		})()
	);
});

app.get("/api/getannoyed", (req, res) => {
	if (successfulAnnoys > 0) {
		res.json(
			`${successfulAnnoys} people annoyed you in the past 5 seconds`
		);
		successfulAnnoys = 0;
	} else res.json("0");
});

let successfulAnnoys = 0;

function checkAnswer(question, id, answer) {

}

app.post("/api/checkandsubmit", (req, res) => {
	// expects
	// {
	// 	"mathAnswer": 4,
	// 	"mathID": 1,
	// 	"riddleAnswer": "hole",
	//  "riddleID": 1,
	// 	"unscrambleAnswer": "hexakosioihexekontahexaphobia",
	//  "unscrambleID": 1,"
	// 	"time": "2021-05-21T18:25:43.511Z"
	// }
	const body = req.body;
	// console.log(body.unscrambleAnswer);
	const MathAnswer = Number(body.mathAnswer.toString().trim()); // might need some more cleaning
	const RiddleAnswer = body.riddleAnswer
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]/g, "");
	const UnscrambleAnswer = body.unscrambleAnswer
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]/g, "");

	// IDs
	const MathID = body.mathID;
	const RiddleID = body.riddleID;
	const UnscrambleID = body.unscrambleID;

	// keys
	let passedMath = false;
	let passedRiddle = false;
	let passedUnscramble = false;

	// check scramble
	if (
		UnscrambleAnswer ===
		wordsToScramble.find((word) => word.id === UnscrambleID).word.toLowerCase()
	) {
		passedUnscramble = true;
		console.log("passed unscramble");
	}

	// check math
	if (
		MathAnswer === mathPuzzles.find((puzzle) => puzzle.id === MathID).answer
	) {
		passedMath = true;
		console.log("passed math");
	}

	// check riddle
	if (
		RiddleAnswer === Riddles.find((riddle) => riddle.id === RiddleID).answer
	) {
		passedRiddle = true;
		console.log("passed riddle");
	}

	if (passedMath && passedRiddle && passedUnscramble) {
		res.json(
			"Notification successfully sent to all of my devices 😥"
		);
		console.log("someone passed at " + body.time);
		successfulAnnoys++;
	}
	// You failed to solve the puzzles, try again in a day (Don't check your cookies) 😈 add cookies in future
	// else res.json(JSON.stringify(`You failed to solve the puzzles 😈\nMath:${passedMath}\nRiddle${passedRiddle}\nUnscramble:${passedUnscramble}`));
	else
		res.json(
			"You failed to solve the puzzles 😈"
		);
});

module.exports = app;
