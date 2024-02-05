import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ContractFactory } from "ethers";
import { describe, test } from "mocha";
import { strictEqual } from "node:assert";
import { Blend as BlendContract } from "../typechain-types/contracts/Blend";

// @ts-ignore
import { ethers } from "hardhat";

async function deploy() {
  const [owner, otherAccount] = await ethers.getSigners();
  const Blend: ContractFactory = await ethers.getContractFactory("Blend");
  const blend = (await Blend.deploy()) as BlendContract;
  const initAmount = 1000n * 10n ** 18n;
  await blend.mint(owner.address, initAmount);
  await blend.mint(otherAccount.address, initAmount);
  return {
    owner,
    otherAccount,
    initAmount,
    blend,
  };
}

describe("blend test", () => {
  test("should be right name and symbol", async () => {
    const { blend } = await loadFixture(deploy);
    strictEqual(await blend.name(), "Blend", "name is not right");
    strictEqual(await blend.symbol(), "BLD", "symbol is not right");
  });
  test("should be right decimals", async () => {
    const { blend } = await loadFixture(deploy);
    strictEqual(await blend.decimals(), 18n, "decimals is not right");
  });
  test("should be mint right amount", async () => {
    const { owner, otherAccount, initAmount, blend } =
      await loadFixture(deploy);
    const ownerTokenBalance = await blend.balanceOf(owner.address);
    const otherTokenBalance = await blend.balanceOf(otherAccount.address);
    strictEqual(
      ownerTokenBalance.toString(),
      initAmount.toString(),
      "owner balance is not right",
    );
    strictEqual(
      otherTokenBalance.toString(),
      initAmount.toString(),
      "other balance is not right",
    );
  });
});
