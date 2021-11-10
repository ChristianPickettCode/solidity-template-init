import { task } from "hardhat/config";

import { Ticket } from "../../types/Ticket";
import { Ticket__factory } from "../../types/factories/Ticket__factory";

task("deploy:Ticket").setAction(async function (_, { ethers }) {
  const ticketFactory: Ticket__factory = await ethers.getContractFactory("Ticket");
  const ticket: Ticket = <Ticket>await ticketFactory.deploy();
  await ticket.deployed();
  console.log("Ticket deployed to: ", ticket.address);
});
