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

	// 	var contract1 = new eth.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});

	// 	myContract.deploy({
	//     data: '0x12345...',
	//     arguments: [123, 'My String']
	// })

	ballotList = new web3.eth.Contract(
		BALLOT_ABI.BALLOT_ABI,
		BALLOT_ADDRESS.BALLOT_ADDRESS
	);
}

connectWeb3();
// routes(app, accounts, contactList);

app.get("/api/candidates", async (request, response) => {
	// candidates = [
	// 	{
	// 		name: "foo",
	// 		numberOfVotes: 0,
	// 	},
	// 	{
	// 		name: "bar",
	// 		numberOfVotes: 2,
	// 	},
	// ];

	numCandidates = await ballotList.methods.getNumOfCandidates().call();

	const candidates = [];

	for (let index = 0; index < numCandidates; index++) {
		const candidate = await ballotList.methods.getCandidate(index).call();
		candidates.push({
			...candidate,
			name: hex_to_ascii(candidate["0"]),
			// name: candidate["0"],
			nameHex: candidate["0"],
			voteCount: candidate["1"],
		});
	}

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
	return response.json(winnerName);
});

const fbAccounts = {
	r18j33k2X1VYHkACoB2uNcRHjSq1: 0,
	p4WyKDNXd8djPdgouHadSeqBA3m1: 1,
	ePwcD7pG6ZNsA3KlbkMvoajjroA3: 2,
	OgFF18mGSlOzEMnn5pW2zcNNuwF3: 3,
	//
	n80JIl8nTybk2sDlk26kb44DxZf2: 4,
	StfwxQvlBnWtwWamMdS1j3zbuKI3: 5,
};

app.get("/api/my-vote/:id", async (request, response) => {
	const { id: accountNumber } = request.params;
	const myVote = await ballotList.methods
		.getMyVote()
		// .send({ from: accounts[0] });
		.call({ from: accounts[fbAccounts[accountNumber]] });

	return response.json(myVote);
});

app.post("/api/candidates", async (request, response) => {
	try {
		const candidate = request.body;
		const res = await ballotList.methods
			.addCandidate("0x" + ascii_to_hexa(candidate?.name))
			.send({ from: accounts[0] });
		// .send({ from: accounts[candidate?.accountNumber] });

		return response.json(res);
	} catch (error) {
		// console.log(error?.data?.reason);
		// for (const [key, value] of Object.entries(error)) {
		// 	console.log(`${key}: ${value}`);
		// }
		console.log(error);
		return response.status(500).send("You can't add candidates right now");
		return response.status(500).send(error?.data);

		return response.json(error?.data);

		return response.status(500).send("Something broke!");
	}
});
app.post("/api/votes", async (request, response) => {
	try {
		const submittedVote = request.body;
		console.log(submittedVote);
		await ballotList.methods
			.vote(
				submittedVote.candidateId
				// submittedVote.maleGender,
				// submittedVote.femaleGender
			)
			.send({ from: accounts[[fbAccounts[submittedVote.accountNumber]]] });

		return response.json(submittedVote);
	} catch (error) {
		// console.log(error?.data?.reason);
		// for (const [key, value] of Object.entries(error)) {
		// 	console.log(`${key}: ${value}`);
		// }
		console.log(error);
		return response.status(500).send("You can't vote right now");
		return response.status(500).send(error?.data);

		return response.json(error?.data);

		return response.status(500).send("Something broke!");
	}
});

app.get("/api/election/status", async (request, response) => {
	try {
		const res = await ballotList.methods.getElectionStatus().call();

		return response.json(res);
	} catch (error) {
		console.log(error);
		return response.status(500).send("You can't vote right now");
		return response.status(500).send(error?.data);

		return response.json(error?.data);

		return response.status(500).send("Something broke!");
	}
});
app.post("/api/election/end", async (request, response) => {
	try {
		await ballotList.methods.endElection().send({ from: accounts[0] });

		return response.json(true);
	} catch (error) {
		console.log(error);
		return response.status(500).send("You can't vote right now");
		return response.status(500).send(error?.data);

		return response.json(error?.data);

		return response.status(500).send("Something broke!");
	}
});

app.post("/api/election/activate", async (request, response) => {
	try {
		await ballotList.methods.activateElection().send({ from: accounts[0] });

		return response.json(true);
	} catch (error) {
		console.log(error);
		return response.status(500).send("You can't vote right now");
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

app.get("/api/election/dates", async (request, response) => {
	try {
		const dates = {};

		const electionStartDate = await ballotList.methods
			.getElectionStartDate()
			.call();
		const electionEndDate = await ballotList.methods
			.getElectionEndDate()
			.call();

		dates.electionStartDate = electionStartDate;
		dates.electionEndDate = electionEndDate;

		return response.json(dates);
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

function ascii_to_hexa(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join("");
}

function hex_to_ascii(str1) {
	var hex = str1.toString();
	var str = "";
	hex = hex.slice(2);
	leng = hex.indexOf("00");
	// for (var n = 0; n < hex.length; n += 2) {
	for (var n = 0; n < leng; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));

		// arabic 3 chars
		// str += String.fromCharCode(parseInt(hex.substr(n, 3), 16));
	}
	return str;
}
