// @ts-ignore
import { ethers } from "hardhat";

async function main() {
  const blend = await ethers.deployContract("Blend");
  await blend.waitForDeployment();
  console.log("Blend deployed to", blend.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("deploy error", error);
  process.exitCode = 1;
});
