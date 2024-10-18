// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(string => uint) public votes;

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "Already voted");
        votes[candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(string memory candidate) public view returns (uint) {
        return votes[candidate];
    }
}
