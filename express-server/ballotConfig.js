const BALLOT_ADDRESS = "0x53cC2C0C6dED9612Aa4C5d58861e7752d4A2B43e";

const BALLOT_ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "proposals",
		outputs: [
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "voteCount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "voters",
		outputs: [
			{
				internalType: "bool",
				name: "voted",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "vote",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "n",
				type: "bytes32",
			},
		],
		name: "addCandidate",
		outputs: [
			{
				internalType: "uint256",
				name: "arrayLength",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getMyVote",
		outputs: [
			{
				components: [
					{
						internalType: "bool",
						name: "voted",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "vote",
						type: "uint256",
					},
				],
				internalType: "struct Ballot.Voter",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "getNumOfCandidates",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "candidateID",
				type: "uint8",
			},
		],
		name: "getCandidate",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "proposal",
				type: "uint256",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "winningProposal",
		outputs: [
			{
				internalType: "uint256",
				name: "winningProposal_",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "winnerName",
		outputs: [
			{
				internalType: "bytes32",
				name: "winnerName_",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
];

module.exports = {
	BALLOT_ABI,
	BALLOT_ADDRESS,
};
