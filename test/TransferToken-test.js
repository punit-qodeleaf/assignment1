const { expect } = require("chai");

describe("TransferToken", function () {

  let TToken;
  let ttkn;
  let seller;
  let firstBuyer;
  let secondBuyer;
  let addrs;

  beforeEach(async function () {
    TToken = await ethers.getContractFactory("TransferToken");
    [seller, firstBuyer, secondBuyer, ...addrs] = await ethers.getSigners();

    ttkn = await TToken.deploy(10);
  });

  it("should transfer deducting fee", async function () {
    await ttkn.mint(seller.address, 1000);
    await ttkn.transfer(firstBuyer.address, 100);
    const recipientBalance = await ttkn.balanceOf(firstBuyer.address);
    expect(recipientBalance).to.equal(90);
  });

  it("should update feePercent", async function () {
    await ttkn.updateFeePercent(20);
    const feePercent = await ttkn.feePercent();
    expect(feePercent).to.equal(20);
  });

  it("should not transfer accumulated fees if not an owner", async function () {
    expect(ttkn.connect(firstBuyer).transferAccumulatedFee()).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should update accumulated fee after a transaction", async function () {
    expect(await ttkn.accumulatedFees()).to.equal(0);
    await ttkn.mint(seller.address, 1000);
    await ttkn.transfer(firstBuyer.address, 100);
    expect(await ttkn.accumulatedFees()).to.equal(10);
  });

  it("should transfer accumulated fee to seller after transaction", async function () {
    await ttkn.mint(seller.address, 1000);
    await ttkn.transfer(firstBuyer.address, 100);
    await ttkn.transferAccumulatedFee();
    expect(await ttkn.balanceOf(seller.address)).to.equal(910);
    expect(await ttkn.accumulatedFees()).to.equal(0);
  });
})