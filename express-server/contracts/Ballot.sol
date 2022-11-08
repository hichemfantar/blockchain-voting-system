// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title Voting with delegation.
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        // uint weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
        // address delegate; // person delegated to
        uint256 vote; // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name; // short name (up to 32 bytes)
        uint256 voteCount; // number of accumulated votes
    }

    // address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    // constructor(bytes32[] memory proposalNames) {
    constructor() {
        // chairperson = msg.sender;
        // voters[chairperson].weight = 1;
        bytes32[2] memory proposalNames = [bytes32("foo"), bytes32("bar")];

        // string[2] memory proposalNames = ["foo", "bar"];

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint256 i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function addCandidate(bytes32 n) public returns (uint256 arrayLength) {
        Proposal memory m;
        m.name = n;
        m.voteCount = 0;
        proposals.push(m);
        return proposals.length;
    }

    function getMyVote() public view returns (Voter memory) {
        return voters[msg.sender];
    }

    function getNumOfCandidates() public view returns (uint256) {
        return proposals.length;
    }

    function getCandidate(uint8 candidateID)
        public
        view
        returns (bytes32, uint256)
    {
        return (proposals[candidateID].name, proposals[candidateID].voteCount);
    }

    // function getAllVoters() public view returns (Voter[] memory) {
    //     Voter[] memory ret = new Voter[](5);
    //     for (uint256 i = 0; i < 1; i++) {
    //         ret[i] = voters[i];
    //     }
    //     return ret;
    // }

    // function getAllVoters() public view returns (address[] memory){
    //     address[] memory ret = new address[](addressRegistryCount);
    //     for (uint i = 0; i < addressRegistryCount; i++) {
    //         ret[i] = addresses[i];
    //     }
    //     return ret;
    // }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint256 proposal) external {
        Voter storage sender = voters[msg.sender];
        // require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        // proposals[proposal].voteCount += sender.weight;
        proposals[proposal].voteCount++;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
