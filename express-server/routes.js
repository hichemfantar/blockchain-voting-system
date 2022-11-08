// import web3 from "../../Ethereum/web3";
// import Election from "../../Ethereum/election";

// function routes(app, accounts, contactList) {
// 	app.get("/candidates", async (request, response) => {
// 		try {
// 			const address = request.get("address");
// 			const election = Election(address);
// 			const summary = await election.methods.getElectionDetails().call();

// 			const electionDetails = {
// 				election_name: summary[0],
// 				election_description: summary[1],
// 			};

// 			const c = await election.methods.getNumOfCandidates.call();

// 			let candidates = [];
// 			for (let i = 0; i < c; i++) {
// 				candidates.push(await election.methods.getCandidate(i).call());
// 			}

// 			const candidatesCleaned = candidates.map((candidate) => {
// 				i++;
// 				return {
// 					name: candidate[0],
// 					description: candidate[1],
// 					image: candidate[2],
// 					numberOfVoters: candidate[3],
// 				};
// 			});

// 			response.json(candidatesCleaned);
// 		} catch (err) {
// 			console.log(err.message);
// 		}
// 	});

// 	app.post("/vote", async (request, response) => {
// 		try {
// 			const voteChoice = parseInt(event.currentTarget.id, 10);
// 			const accounts = await web3.eth.getAccounts();
// 			const add = Cookies.get("address");
// 			const election = Election(add);
// 			await election.methods
// 				.vote(voteChoice, Cookies.get("voter_email"))
// 				.send({ from: accounts[0] });
// 			alert("Voted!");

// 			response.json(candidatesCleaned);
// 		} catch (err) {
// 			console.log(err.message);
// 		}
// 	});

// 	app.post("/election", async (request, response) => {
// 		try {
// 			const companyEmail = "company@email.com";
// 			const accounts = await web3.eth.getAccounts();
// 			const succ = await Election_Factory.methods
// 				.createElection(companyEmail, election_name, election_description)
// 				.send({ from: accounts[0] });

// 			if (succ) {
// 				const summary = await Election_Factory.methods
// 					.getDeployedElection("xyz")
// 					.call();
// 				Cookies.set("address", summary[0]);

// 				// Router.pushRoute(`/election/${summary[0]}/company_dashboard`);
// 				response.json(true);
// 			}
// 		} catch (err) {
// 			console.log(err.message);
// 		}
// 	});

// 	app.get("/contacts", async (request, response) => {
// 		try {
// 			let cache = [];

// 			const COUNTER = await contactList.methods.count().call();

// 			for (let i = 1; i <= COUNTER; i++) {
// 				const contact = await contactList.methods.contacts(i).call();
// 				cache = [...cache, contact];
// 			}

// 			response.json(cache);
// 		} catch (error) {
// 			console.log(error);
// 			response.json({ err: error });
// 		}
// 	});
// }

// module.exports = routes;
