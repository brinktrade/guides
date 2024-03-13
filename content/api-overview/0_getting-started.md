---
title: Getting Started
excerpt: "This guide will walk you through Brink API."
slug: api-getting-started
category: 640d40f77d896f000b303dd4
---
# Quick start

The Brink API is the primary interface into the Brink ecosystem, enabling developers to build transactionless dApps with intent-centric architecture. The API allows creation of intents and provides both on-chain and off-chain data for intents. Additionally, it can be used by Solvers to discover and execute intents.

## Getting an API Key

To acquire an API key, connect with our team on [Discord](https://discord.gg/9kpdMhh3t3) . The API key is required for preventing spam in our Intent Pool.

## **Supported Chains**

Brink is currently available on the following blockchains, with plans to expand. If you're interested in seeing Brink support additional chains, please contact our team via [Discord](https://discord.gg/9kpdMhh3t3). We're always looking to broaden our support based on user demand.

| Name | chain Id |
| --- | --- |
| Ethereum | 1 |
| Optimism | 10 |
| Polygon | 137 |
| Arbitrum | 42161 |

## Categories

The Brink API serves as a gateway for building, monitoring, and executing Brink Intents, organized into distinct categories for streamlined operations.

### Signers

This category encompasses endpoints designed for account interactions and status inquiries. It includes functionality to verify the address and deployment status of a signer account, alongside endpoints for creating intent execution calls directly to a signer account.

### Segments

This category provides endpoints for each supported intent segment. All Brink intents are made up of segments, and solvers must successfully run each segment in order to execute an intent. These endpoints offer validation status of any Brink segment on-chain, so solvers can determine whether the intent as a whole is executable.

### Intents

This section offers tools to compile, submit, and retrieve detailed information on all intents within the Brink Intent Pool. It is crucial for navigating the Intent Pool and understanding the precise status of any Intent.

### Routing

This category delivers insights into estimates and routing from different sources, providing approximate gas requirements and execution costs for intents. Such information is vital for solvers that need efficient planning and execution of intents.

### Oracles

Endpoints under this category allow access to oracle values across supported chains. Oracles are used to obtain on-chain prices for ERC20 token pairs.