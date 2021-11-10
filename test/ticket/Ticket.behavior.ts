import { ethers } from "hardhat";
import { expect } from "chai";

export function shouldBehaveLikeTicket(): void {
  it("should not buy tickets", async function () {
    await expect(
      this.ticket
        .connect(this.signers.admin)
        .buyTickets(this.signers.admin.address, 3, { value: ethers.utils.parseEther("0.02") }),
    ).to.be.revertedWith("not enough eth for tickets.");
  });

  it("should return tickets bought", async function () {
    await this.ticket
      .connect(this.signers.admin)
      .buyTickets(this.signers.admin.address, 3, { value: ethers.utils.parseEther("0.03") });
    expect(await this.ticket.connect(this.signers.admin).ticketHolders(this.signers.admin.address)).to.equal(3);

    await this.ticket
      .connect(this.signers.admin)
      .buyTickets(this.signers.admin.address, 10, { value: ethers.utils.parseEther("0.10") });
    expect(await this.ticket.connect(this.signers.admin).ticketHolders(this.signers.admin.address)).to.equal(13);
  });

  it("should return tickets used", async function () {
    await this.ticket
      .connect(this.signers.admin)
      .buyTickets(this.signers.admin.address, 3, { value: ethers.utils.parseEther("0.03") });
    await this.ticket.connect(this.signers.admin).useTickets(this.signers.admin.address, 1);
    expect(await this.ticket.connect(this.signers.admin).ticketHolders(this.signers.admin.address)).to.equal(2);
  });

  it("should not return tickets used", async function () {
    await this.ticket
      .connect(this.signers.admin)
      .buyTickets(this.signers.admin.address, 3, { value: ethers.utils.parseEther("0.03") });
    await expect(this.ticket.connect(this.signers.admin).useTickets(this.signers.admin.address, 4)).to.be.revertedWith(
      "Your do not have enought tickets.",
    );
  });

  it("should not return tickets used", async function () {
    await this.ticket
      .connect(this.signers.admin)
      .buyTickets(this.signers.admin.address, 10, { value: ethers.utils.parseEther("0.1") });
    await expect(this.ticket.connect(this.signers.admin).withdraw()).to.not.be.reverted;
  });
}
