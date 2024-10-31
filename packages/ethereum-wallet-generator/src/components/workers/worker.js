import generate from "/src/components/generator/generate";

onmessage = ({ data }) => {
  const { start, end } = data;
  let publicKey = "";
  let privateKey = "";
  var array = new Uint32Array(10);
  do {
    self.crypto.getRandomValues(array);
    const { privateKey: pk, ethereumAddress: ethAddress } = generate(
      array.join("")
    );
    publicKey = ethAddress;
    privateKey = pk;
  } while (!hasSameStartAndEnd(start, end, publicKey));

  postMessage({ publicKey, privateKey });
};

function hasSameStartAndEnd(start, end, publicKey) {
  const startLength = start.length;
  const endLength = end.length;
  const startPublicKey = publicKey.slice(2, 2 + startLength);
  const endPublicKey = publicKey.slice(-endLength);

  return (
    (!startLength || startPublicKey === start) &&
    (!endLength || endPublicKey === end)
  );
}
