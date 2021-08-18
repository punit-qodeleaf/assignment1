const { expect } = require("chai");

describe("FeeDeductTransfer", function () {

  let FDToken;
  let fdtkn;
  let seller;
  let firstBuyer;
  let secondBuyer;
  let addrs;

  beforeEach(async function () {
    FDToken = await ethers.getContractFactory("FeeDeductTransfer");
    [seller, firstBuyer, secondBuyer, ...addrs] = await ethers.getSigners();

    fdtkn = await FDToken.deploy(1000, "Token", "tkn", 3, 1000000);
  });

  it("should transfer deducting fee", async function () {
    await fdtkn.mint(seller.address, 1000);
    await fdtkn.transfer(firstBuyer.address, 100);
    const recipientBalance = await fdtkn.balanceOf(firstBuyer.address);
    expect(recipientBalance).to.equal(90);
  });

  it("should update feePercent", async function () {
    await fdtkn.updateFeePercent(20);
    const feePercent = await fdtkn.feePercent();
    expect(feePercent).to.equal(20);
  });

  it("should not transfer accumulated fees if not an owner", async function () {
    expect(fdtkn.connect(firstBuyer).transferAccumulatedFee()).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should update accumulated fee after a transaction", async function () {
    expect(await fdtkn.accumulatedFees()).to.equal(0);
    await fdtkn.mint(seller.address, 1000);
    await fdtkn.transfer(firstBuyer.address, 100);
    expect(await fdtkn.accumulatedFees()).to.equal(10);
  });

  it("should transfer accumulated fee to owner after transaction", async function () {
    await fdtkn.mint(firstBuyer.address, 1000);
    await fdtkn.connect(firstBuyer).transfer(secondBuyer.address, 100);
    await fdtkn.transferAccumulatedFee();
    expect(await fdtkn.balanceOf(seller.address)).to.equal(10);
    expect(await fdtkn.balanceOf(secondBuyer.address)).to.equal(90);
    expect(await fdtkn.accumulatedFees()).to.equal(0);
  });

  it("should not increase total supply after transferring accumulated fees", async function () {
    await fdtkn.mint(firstBuyer.address, 1000);
    await fdtkn.connect(firstBuyer).transfer(secondBuyer.address, 100);
    await fdtkn.transferAccumulatedFee();
    expect(await fdtkn.totalSupply()).to.equal(1000);
  });

  it("should throw error if fee percent is greater than 100", async function () {
    expect(fdtkn.updateFeePercent(11000)).to.be.revertedWith("Fee Percent cannot be more than 100");
  })
})