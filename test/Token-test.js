const { expect } = require("chai");

describe("Token", function () {
  
  let Token;
  let tkn;
  let seller;
  let firstBuyer;
  let secondBuyer;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [seller, firstBuyer, secondBuyer, ...addrs] = await ethers.getSigners();

    tkn = await Token.deploy();
  });

  it("Should mint token for owner", async function () {

    await tkn.mint(seller.address, 100);

    const sellerBalance = await tkn.balanceOf(seller.address);

    expect(sellerBalance).to.equal(100);

  });

  it("Should not mint token via other address", async function () {

    expect( tkn.connect(firstBuyer).mint(firstBuyer.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");

  });

  it("check if owner is correct", async function () { 
    expect(await tkn.owner()).to.equal(seller.address);
   });

});
