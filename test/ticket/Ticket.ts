import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { Ticket } from "../../types/Ticket";
import { Signers } from "../types";
import { shouldBehaveLikeTicket } from "./Ticket.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Ticket", function () {
    beforeEach(async function () {
      const TicketArtifact: Artifact = await artifacts.readArtifact("Ticket");
      this.ticket = <Ticket>await waffle.deployContract(this.signers.admin, TicketArtifact);
    });

    shouldBehaveLikeTicket();
  });
});
