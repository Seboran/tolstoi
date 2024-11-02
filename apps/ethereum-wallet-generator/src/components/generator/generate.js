import { ec } from "elliptic";
import BN from "bn.js";
import { keccak256 } from "js-sha3";
var ec2 = new ec("secp256k1");

import { Buffer } from "buffer";

const MAX_PRIVATE_KEY = new BN("2").pow(new BN("256"));
/**
 *
 * @param {String} randomSeed random number in base 10
 * @returns
 */
function generatePrivateKeyFromRandomInput(randomSeed) {
  return new BN(randomSeed, 10).mod(MAX_PRIVATE_KEY);
}

/**
 *
 * @param {BN} pk BigNumber private value
 * @returns
 */
function generatePublicKeyFromPrivateKey(pk) {
  var G = ec2.g; // Generator point
  var pubPoint = G.mul(pk); // EC multiplication to determine public point
  var x = pubPoint.getX().toArrayLike(Buffer); //32 bit x co-ordinate of public point
  var y = pubPoint.getY().toArrayLike(Buffer); //32 bit y co-ordinate of public point

  var publicKey = Buffer.concat([x, y]);

  return publicKey;
}

/**
 *
 * @param {Buffer} publicKey
 * @returns
 */
function generateEthereumAddressFromPublicKey(publicKey) {
  const address = keccak256(publicKey); // keccak256 hash of publicKey

  const buf2 = Buffer.from(address, "hex");
  return "0x" + buf2.slice(-20).toString("hex"); // take last 20 bytes as ethereum adress
}

export default function (randomSeed) {
  const privateKeyBN = generatePrivateKeyFromRandomInput(randomSeed);
  const ethereumAddress = generateEthereumAddressFromPublicKey(
    generatePublicKeyFromPrivateKey(privateKeyBN)
  );
  const privateKey = convertBNtoString(privateKeyBN);
  return { privateKey, ethereumAddress };
}

export {
  generatePrivateKeyFromRandomInput,
  generatePublicKeyFromPrivateKey,
  generateEthereumAddressFromPublicKey,
  MAX_PRIVATE_KEY,
};

/**
 *
 * @param {BN} bn
 */
function convertBNtoString(bn) {
  return bn.toString("hex");
}
