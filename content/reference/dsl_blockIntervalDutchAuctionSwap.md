---
title: blockIntervalDutchAuctionSwap
excerpt: "Execute a one-time or recurring swap using a Dutch auction mechanism."
slug: blockintervaldutchauctionswap
category: 650cebad6a0b75002cfb4757 # DSL category
parentDoc: 650cecc273f124002190f897 # actions parent doc
hidden: false
---

Creates a one-time or recurring dutch auction swap. The auction will start at a price above the current market price and end at a price below the current market price, and will re-occur at a set interval until the maximum number of auctions is reached or the swap is cancelled.

| Property |  Required  | Description |
| :------- | :--------- | :---------- |
| `type`   | Yes | MUST be set to `blockIntervalDutchAuctionSwap` |
| `intervalId` | Yes | ID of this intent segment, can be randomly-generated. |
| `owner`  | Yes | The address of the account to swap for. |
| `tokenIn` | Yes | The address of ERC-20 token to withdraw from `owner` for the swap. |
| `tokenOut` | Yes | The address of ERC-20 token to swap `tokenIn` for. |
| `tokenInAmount` | Yes | The amount of `tokenIn` to swap. Should be formatted as the amount of the smallest unit based on decimal amount of token. e.g. `10_000000` for 10 USDC (6 decimals) |
| `firstAuctionStartBlock` | Yes | The block number at which the **first** dutch auction should start. |
| `auctionInterval` | Yes | The number of blocks that should elapse between the end of the last auction and the start of the next auction.  |
| `auctionDuration` | Yes | The number of blocks that each auction should (theoretically) last for. |
| `startPercent` | Yes | The percent **above** the current market price that the dutch auction should start at. Should **always** be `<= 100` |
| `endPercent` | Yes | The percent **below** the current market price that the dutch auction should end at. Should **always** be a negative value AND be `>= -100`. |
| `maxAuctions` | No | The maximum number of auctions that should re-occur. A value of `0` means auction will re-occur infinitely, aka until cancelled. |
| `twapInterval` | No | The length of time in seconds at which TWAP price-reads during the dutch auction should take place. |
| `twapFeePool` | No | The Uniswap v3 fee tier of the liquidity pool to read the price from. e.g. `500`, `3000`, `10000`. |

## Example

```json
{
  "type": "blockIntervalDutchAuctionSwap", // MUST be `blockIntervalDutchAuctionSwap`
  "intervalId": "10022860101187117925", // random ID
  "owner": "0xcEd90a58Ba727ABa04bb8C11a3b40a1c866b36F0",
  "tokenIn": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // MATIC (on Polygon)
  "tokenOut": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // DAI (on Polygon)
  "tokenInAmount": "150000000000000000000", // 150 MATIC

  // hourly swap, 3 times
  "firstAuctionStartBlock": 53584190, // polygon block number
  "auctionInterval": 1600, // ~45 mins
  "auctionDuration": 800, // ~15 mins
  "maxAuctions": 3,
  
  // auction price starts at 1.8% above current market price
  // auction price ends at 2.3% below current market price
  "startPercent": 1.8,
  "endPercent": -2.3,

  "twapInterval": 120, // TWAP over 2 minutes
  "twapFeePool": 3000 // price-reads at the Uniswap V3 MATIC/DAI 0.3% liquidity pool
}
```