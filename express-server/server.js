// TODO connect frontend,

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const Web3 = require("web3");
const mongodb = require("mongodb").MongoClient;
const contract = require("@truffle/contract");
const artifacts = require("./build/contracts/Contacts.json");
const CONTACT_ABI = require("./contactConfig");
const CONTACT_ADDRESS = require("./contactConfig");
const BALLOT_ABI = require("./ballotConfig");
const BALLOT_ADDRESS = require("./ballotConfig");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

if (typeof web3 !== "undefined") {
	var web3 = new Web3(web3.currentProvider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

let accounts;
let ballotList;
let contactList;

async function connectWeb3() {
	accounts = await web3.eth.getAccounts();
	// contactList = new web3.eth.Contract(
	// 	CONTACT_ABI.CONTACT_ABI,
	// 	CONTACT_ADDRESS.CONTACT_ADDRESS
	// );

	ballotList = new web3.eth.Contract(
		BALLOT_ABI.BALLOT_ABI,
		BALLOT_ADDRESS.BALLOT_ADDRESS
	);
}

connectWeb3();
// routes(app, accounts, contactList);

app.get("/api/candidates", async (request, response) => {
	candidates = [
		{
			name: "foo",
			numberOfVotes: 0,
		},
		{
			name: "bar",
			numberOfVotes: 2,
		},
	];

	candidates = await ballotList.methods
		.getNumOfCandidates()
		// .send({ from: accounts[0] });
		.call();
	// candidates = await ballotList.methods
	// 	.proposals()
	// 	// .send({ from: accounts[0] });
	// 	.call();

	return response.json(candidates);
});

app.get("/api/candidates/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const candidate = await ballotList.methods
			.getCandidate(id)
			// .send({ from: accounts[0] });
			.call();

		return response.json(candidate);
	} catch (error) {
		console.log(error);
		return response.status(404).send("Candidate not found");
	}
});

app.get("/api/winning-vote", async (request, response) => {
	const winnerName = await ballotList.methods
		.winnerName()
		// .send({ from: accounts[0] });
		.call();
	console.log(winnerName);
	return response.json(winnerName);
});

app.get("/api/my-vote", async (request, response) => {
	const myVote = await ballotList.methods
		.getMyVote()
		// .send({ from: accounts[0] });
		.call();
	console.log(myVote);
	return response.json(myVote);
});

app.post("/api/votes", async (request, response) => {
	try {
		const submittedVote = request.body;

		await ballotList.methods
			.vote(submittedVote?.candidateId)
			.send({ from: accounts[submittedVote?.accountNumber] });

		return response.json(submittedVote);
	} catch (error) {
		// console.log(error?.data?.reason);
		// for (const [key, value] of Object.entries(error)) {
		// 	console.log(`${key}: ${value}`);
		// }
		console.log(error);
		return response.status(500).send(error?.data);

		return response.json(error?.data);

		return response.status(500).send("Something broke!");
	}
});

app.get("/api/voters", async (request, response) => {
	try {
		const voters = await ballotList.methods.voters().call();

		return response.json(voters);
	} catch (error) {
		console.log(error);
		return response.status(500).send(error?.data);
	}
});

app.listen(process.env.PORT || 3001, () => {
	console.log("listening on port " + (process.env.PORT || 3001));
});

// mongodb.connect(
// 	"mongodb://127.0.0.1:27017/blockchain-node-api",
// 	{
// 		useUnifiedTopology: true,
// 	},
// 	async (err, client) => {
// 		const db = client.db("Cluster0");
// 		const accounts = await web3.eth.getAccounts();
// 		const contactList = new web3.eth.Contract(
// 			CONTACT_ABI.CONTACT_ABI,
// 			CONTACT_ADDRESS.CONTACT_ADDRESS
// 		);

// 		routes(app, db, accounts, contactList);
// 		app.listen(process.env.PORT || 3001, () => {
// 			console.log("listening on port " + (process.env.PORT || 3001));
// 		});
// 	}
// );
