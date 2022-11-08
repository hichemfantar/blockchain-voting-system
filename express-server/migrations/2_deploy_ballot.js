const Ballot = artifacts.require("./Ballot.sol");

module.exports = function (deployer) {
	// deployer.deploy({
	// 	data: Ballot,
	// 	arguments: ["isie", "president", "election"],
	// });
	deployer.deploy(Ballot);
};
