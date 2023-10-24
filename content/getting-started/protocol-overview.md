---
title: Protocol Overview
excerpt: "A high-level overview of the Brink Intents protocol architecture."
slug: protocol-overview
category: 6397ac3510831702c7437f5d
---
> 🚧 Disclaimer
>
> The Brink engineering team is still working hard on the products explained in these docs. Therefore, you may come across some inconsistencies or stale/missing information. We are working hard to make the Brink Intents Protocol fully feature-complete, and refining the documentation is part of that process. If you have any questions, please reach out to us on [Discord](https://discord.gg/8Mjrq77xyd).

Brink Intents protocol is designed to allow users to delegate execution of complex intents to solvers in the most secure and efficient way possible.

Users of Brink Intents enabled DApps can accomplish tasks without transacting directly with EVM networks. Solvers handle the complexity of transactions on the user’s behalf.

![](https://files.readme.io/08eb7f0-image.png)

The protocol consists of these components:

## API

A hosted service for building, signing, storing, and reading intents. This is the primary interface for developers to build and submit intents, and for solvers to search for intents.

See the [API reference](https://docs.brink.trade/reference) for more info.

## Intent Pool

An off-chain intents data store. All intents submitted through the API are stored here.

## Solver Network

A network of bots that resolve intent outcomes on EVM-compatible chains.

## Brink Smart Contracts

A smart contract layer that solvers must interact with. Enforces security of intent execution and verification.

See [brink-core](https://github.com/brinktrade/brink-core) and [brink-strategies](https://github.com/brinktrade/brink-strategies) repos for more info.