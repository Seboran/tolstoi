import { describe, it, expect } from "vitest";
import BN from "bn.js";

import generate, {
  generatePrivateKeyFromRandomInput,
  generateEthereumAddressFromPublicKey,
  generatePublicKeyFromPrivateKey,
  MAX_PRIVATE_KEY,
} from "../generate";

const privateKey =
  "0000000000000000000000000000000000000000000000000000000000000001";
const publicKeyExpected =
  "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8";
const publicAddressExpected = "0x7e5f4552091a69125d5dfcb7b8c2659029395bdf";
describe("Generate", () => {
  it("has max private key of correct value", () => {
    expect(MAX_PRIVATE_KEY.sub(new BN(1)).toString(2)).length(256);
  });

  it("generates private key from random input", () => {
    const result = generatePrivateKeyFromRandomInput("1");
    expect(result.toString("hex")).equals("1");
  });

  it("generates private key in respect to modulo", () => {
    const randomStringArgument = Array.from(Array(5000).keys()).join("");
    const result = generatePrivateKeyFromRandomInput(randomStringArgument);
    expect(result.toString("hex")).length.lessThan(255);
  });

  it("generates public key from simple private key", () => {
    const result = generatePublicKeyFromPrivateKey(privateKey);
    expect(result.toString("hex")).equals(publicKeyExpected);
  });

  it("generates public address from public key", () => {
    const result = generateEthereumAddressFromPublicKey(
      new BN(publicKeyExpected, "hex").toBuffer()
    );
    expect(result).equals(publicAddressExpected);
  });

  it("should generate correct private key and ethereum address", () => {
    const { privateKey, ethereumAddress } = generate("1");
    expect(privateKey).equals("1");
    expect(ethereumAddress).equals(publicAddressExpected);
  });
});
