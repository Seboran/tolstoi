# ethereum-wallet-generator

This application lets you create a private key / ethereum address pair with custom suffix and prefix. [You can try app yourself](https://seboran.github.io/ethereum-wallet-generator/)

Every generated address respect the ethereum specs (see the [Ethereum yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf)), but I wouldn't advise you to use these addresses for real usage.

## What's the point of this app?

This app shows that it is easy to create an ethereum address that almost looks like another ethereum address. Take these two ethereum address :

```
0x935d442b8d998e478279e47edd7d1dbabf920000
0xadfce6b775ab236c46f16bf3a3476612a3dc0000
```

They both share the same four ending 0s. Here are the respective private keys:

```
d36d062e9f3ed2957458f5ba400c868d072fad69e8bb3f24420669317bd908e5
33408b4122e6d3d7dba2104b1adee68cc5b96d81412aadad1af98203ea3b6218
```

Now take this public/private pair:

```
0x83eadc8f7fdf30b82f2c7b2493fe3b1baa22d9c8
e832f898c14f716e1c1c47f150140096ca7f04deac11a0c1b38139f9af0c143d
```

Metamask only show the first three letters and last four chars of the public url

If you wait long enough you can generate a pair that has the same prefix of length 3 and suffix of length 4:

```

```

You can also create custom ethereum addresses with cool prefixes:

```
leet: 0x1337642f7757b8cbcbd84dc44346d4e4291b3e58 / d6a9d5a05fa17ee0d3fd0e2119e89c5a3190cae1d1bdde3e2ad3418021b65e2d

420 69: 0x4206937ef998c8e11700d007cbcbec68150462c6 / 6efda672332dfc990a1549ba4508bf7158b708118bb08b58f3c410fce35933de
```

Note : using a suffix or prefix of cumulated length greater than 5 is really slow as the difficulty rises exponentially.

## Todo

- [ ] Progress bar
- [ ] Ethereum address history
- [ ] Connection with web3

## Project Setup

```sh
yarn run install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```
