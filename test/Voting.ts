import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Voting", function () {
  async function deployVotingFixture() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    return { voting };
  }

  it("Should allow a user to vote", async function () {
    const { voting } = await loadFixture(deployVotingFixture);
    await voting.vote("Candidate A");
    const votes = await voting.getVotes("Candidate A");
    expect(votes).to.equal(1);
  });

  it("Should not allow a user to vote more than once", async function () {
    const { voting } = await loadFixture(deployVotingFixture);
    await voting.vote("Candidate A");
    await expect(voting.vote("Candidate A")).to.be.revertedWith("Already voted");
  });

  it("Should allow multiple users to vote", async function () {
    const { voting } = await loadFixture(deployVotingFixture);
    const [owner, addr1, addr2] = await ethers.getSigners();

    await voting.connect(addr1).vote("Candidate A");
    await voting.connect(addr2).vote("Candidate B");

    const votesA = await voting.getVotes("Candidate A");
    const votesB = await voting.getVotes("Candidate B");
    expect(votesA).to.equal(1);
    expect(votesB).to.equal(1);
  });
});
