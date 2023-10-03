# Creating Your First Intent

This guide will walk you through creating your first intent. The intent you will be defining here is a *recurring swap* intent. The steps outlined in this tutorial can be done either within a new codebase or within an existing project.

This guide uses [viem](https://www.npmjs.com/package/viem "viem package on npm") for wallet signatures and [axios](https://www.npmjs.com/package/axios "axios package on npm") for HTTP requests. You may replace these with other equivalent packages of your choice, such as `ethers.js`/`web3.js` or `fetch` respectively.

We've also opted to use [dotenv](https://www.npmjs.com/package/dotenv "dotenv package on npm") to hide our secrets, as we will be using both an EOA private key and a Brink API key.

## Setup

We'll start by installing our packages and setting up the JavaScript code file. In the file, we will create one `main()` function that runs our script end-to-end. We'll also load our secrets from our .env file.

```bash
$ npm install viem axios dotenv
```

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  // ...
}

main()
```

**Note**: This guide makes use of the Brink API which requires an API key. Please [contact us](mailto:_____________) to get yours!

## 1. Constructing the Intent

The intent we'll be creating in this guide is a **recurring swap intent**, AKA dollar-cost averaging (DCA). We want to swap 5,000 USDC for ETH approximately once a week for 3 months or until we cancel the intent early. We'll also incentivize the solver with 2.5% of the swap.

The first step in creating this intent is using Brink's domain-specific language (DSL). The DSL structure for one intent consists of an object with multiple fields that define the guardrails of the intent, which include the `actions`, `conditions` and `replay` fields.

### Brink Intents DSL

Inside of our `main()` function, we will add our Brink DSL object, declaring our recurring swap intent with it's parameters and conditions.

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  const myRecurringIntent = {
    actions: [{
      type: 'marketSwap',
      tokenInAmount: 5000.0,
      tokenIn: 'USDC',
      tokenOut: 'ETH',
      fee: 2.5 // incentivize solver with 2.5% of the swap
    }],
    conditions: [{
      type: 'blockInterval',
      interval: 50_000, // ~7 days
      maxIntervals: 12 // 7 days * 12 === 12 weeks or 3 months
    }],
    replay: {
      nonce: 123, // TODO, must make API request for this value
      runs: 'UNTIL_CANCELLED'
    }
  }
}

main()
```

The `myRecurringIntent` intent object is made up of 3 fields: `actions`, `conditions`, and `replay`.

The `actions` field is an array of objects that define the outcome(s) of our intent, in our case, a 5000 USDC -> ETH market swap. We also set a 2.5% fee that the solver may take as an incentive to fulfill our intent.

Similarly, the `conditions` field is an array of objects that define the conditions that the actions may be executed against. Here, we expect the actions to run at a block interval of 50,000 blocks for 12 intervals to meet our "once a week for 3 months" intent condition.

Finally, the `replay` field defines the replayability for our intent. Since replayability is necessary for any recurring intent or transaction, we allow it by setting the `runs` field to `UNTIL_CANCELLED`, theoretically allowing our intent to be replayed forever (thankfully, our `maxIntervals` value would prevent our intent from *actually* being run forever).

We must also specify the `replay.nonce` value, which requires a quick request to the Brink API.

### Fetching the Nonce Value

To fetch the correct `nonce` value, we must make a GET request to the `/signers/<SIGNER>/nextAvailableBit/v1` endpoint (replacing `<SIGNER>` with the EOA account we'll be using to sign and submit this intent).

This endpoint will respond with a few pieces of data, but we only need the `nonce` value. Once we have the response data, we can plug it in to our intent object.

We'll start by putting our Brink API key into our .env file for security, then loading it into our code as a request header in `axios` with an `x-api-key` field.

```bash
# .env file
BRINK_API_KEY=<my_api_key>
```

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  const nonceRes = await axios.get('https://api.brink.trade/signers/0xc0ffee/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    }
  })

  const myRecurringIntent = {
    actions: [{
      type: 'marketSwap',
      tokenInAmount: 5000.0,
      tokenIn: 'USDC',
      tokenOut: 'ETH',
      fee: 2.5 // incentivize solver with 2.5% of the swap
    }],
    conditions: [{
      type: 'blockInterval',
      interval: 50_000, // ~7 days
      maxIntervals: 12 // 7 days * 12 === 12 weeks or 3 months
    }],
    replay: {
      nonce: parseInt(nonceRes.data.nonce), // nonce value from API response
      runs: 'UNTIL_CANCELLED'
    }
  }
}

main()
```

## 2. Preparing the Intent

Now that our intent is declared, we must sign it via an [EIP-721](https://eips.ethereum.org/EIPS/eip-712 "eip-712") signature. Before signing, we must first construct the signature payload for our intent. Thankfully, there is a Brink API endpoint that quickly provides this payload for us: `/strategies/data/v1`. 

In this request, we must define a few fields to properly prepare the intent. Since this is a GET request, we will pass our data as query parameters.

Params for the `/strategies/data/v1` request include:
- `chainId`: The chain ID of the network you are using (we are using Ethereum Mainnet, `1`).
- `signer`: The address of the account that will be signing the intent.
- `signatureType`: We'll be using the value `EIP712` for this guide.
- `include`: An array of extra data to include in the API response. 
- `strategy`: The intent object we created earlier.

Using the `params` object in axios, we can define our parameters for this call as such:

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  // ... nonce request

  const myRecurringIntent = { /* intent definition */ }

  const prepareRes = await axios.get('https://api.brink.trade/strategies/data/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    },
    params: {
      chainId: 1,
      signer: '0xc0ffee',
      signatureType: 'EIP712',
      include: ['required_transactions'],
      strategy: myRecurringIntent
    }
  })
}

main()
```

We must pass `required_transactions` as an item in the `include` array. By doing so, the Brink API will respond with any transactions that are required to be finalized *before* our intent can be fulfilled by solvers. In our case, a token approval transaction is required.

Once submitted, the `/strategies/data/v1` response data will be structured as such:

```typescript
// response from `/strategies/data/v1`
{
  strategy: { ... },
  eip712Data: {
    types: { ... },
    domain: { ... },
    value: { ... },
    hash: '0x<INTENT_HASH>'
  },
  eip1271Data: { message: 'Not implemented' },
  hash: '0x<INTENT_HASH>',
  requiredTransactions: [
    {
      owner: '<YOUR_PUBLIC_ADDRESS>',
      spender: '<BRINK_PROXY_ADDRESS>',
      currentAllowance: '0',
      requiredAllowance: '5000000000',
      token: { ... },
      minTx: { ... },
      maxTx: { ... }
    }
  ]
}
```

This data will be put to use for the next 2 steps: approving your Brink Proxy to spend tokens, and signing the EIP-712 signature.

## 3. Approving Your Brink Proxy

Before signing and submitting our intent, we must *approve* the signer's Brink Proxy contract to transfer the tokens involved in the intent. For more info on how the Proxy contracts work in the Brink protocol, please reach out on [Discord](https://discord.gg/NNx4Y7XB "brink discord").

We can get all info about the approval transaction in the `requiredTransactions` field of the API response above.

```typescript
{
  //... other response fields
  requiredTransactions: [
    {
      owner: '<YOUR_PUBLIC_ADDRESS>',
      spender: '<BRINK_PROXY_ADDRESS>',
      currentAllowance: '0',
      requiredAllowance: '5000000000',
      token: {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC token address
        // ... other info
     },
      minTx: { ... },
      maxTx: { ... }
    }
  ]
}
```

To simplify this guide, an easy way to quickly approve tokens is by using the Etherscan "Write Contract" (sometimes "Write Proxy Contract") section of the token contract page.

From the `owner` account, you should approve the `spender` address to spend the tokens. We *highly* recommend approving for an unlimited amount of tokens (max uint256 value), but the `requiredAllowance` value in the response is the minimum amount of tokens you must approve.

### Approving Tokens Programmatically

If you'd like to run the approval transaction programmatically or within a web app, you may construct the transaction using either the `minTx` or the `maxTx` objects in the `requiredTransactions` response array. The `minTx` and `maxTx` contain the calldata for the approval transaction for both the minimum allowance amount and the maximum allowance amount respectively.

## 4. Signing the Intent

Now that we've approved our Brink Proxy to spend our tokens, we can finally sign the intent. To do so, we must construct the EIP-712 typed data that we received from the `/strategies/data/v1` endpoint. These values can be found in the `eip712Data` field of the response. We also must set the `primaryType` field to `MetaDelegateCall`.

We can prepare `viem` to sign by adding our private key to our .env file, then loading it into our code as a `walletClient`. Once our `walletClient` is created, we can construct and sign the EIP-712 signature using the `signTypedData()` method, passing in our values from the `eip712Data` field and our `walletClient.account` object.

```bash
# .env file
BRINK_API_KEY=<my_api_key>
SIGNER_PRIVATE_KEY=<my_private_key>
```

Note: We at Brink DO NOT encourage storing private keys in .env files. This is for demonstration purposes only. Please use a more secure method of storing your private keys in production.

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  // ... nonce request

  const myRecurringIntent = { /* intent definition */ }

  const prepareRes = await axios.get('https://api.brink.trade/strategies/data/v1', {
    // ... request config
  })

  const { eip712Data } = prepareRes.data

  const walletClient = viem.createWalletClient({
    chain: mainnet,
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`),
  })

  const signature = await walletClient.signTypedData({
    account: walletClient.account,
    types: eip712Data.types,
    domain: eip712Data.domain,
    message: eip712Data.value,
    primaryType: 'MetaDelegateCall'
  })
}

main()
```

## 5. Submitting the Intent

Now that we have our intent signature using `viem`, we can finally submit it to the Brink API. To do so, we must make a POST request to the `/strategies/submit/v1` endpoint. The data we pass to this endpoint is similar to the data we passed to the `/strategies/data/v1` endpoint, but it's passed as the POST request body, rather than query parameters.

We also get to include the `signature` field from the previous step.

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  // ... nonce request

  const myRecurringIntent = { /* intent definition */ }

  // ... prepareRes and walletClient from previous step

  const signature = await walletClient.signTypedData({
    // ... signTypedData config
  })

  const submitRes = await axios.post('https://api.brink.trade/strategies/submit/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    },
    params: {
      chainId: 1,
      signer: '0xc0ffee',
      signatureType: 'EIP712',
      strategy: myRecurringIntent,
      signature
    }
  })
}

main()
```

Once the signed Brink Intent is submitted to the Brink API, it will be added to the Brink Intentpool and will be available for solvers to fulfill once the conditions are met.

## Conclusion

Congratulations! You've successfully created your first Brink Intent. Your final code file should look something like this:

```typescript
// script.js
const axios = require('axios')
const viem = require('viem')
require('dotenv').config()

const main = async () => {
  const nonceRes = await axios.get('https://api.brink.trade/signers/0xc0ffee/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    }
  })

  const myRecurringIntent = {
    actions: [{
      type: 'marketSwap',
      tokenInAmount: 5000.0,
      tokenIn: 'USDC',
      tokenOut: 'ETH',
      fee: 2.5
    }],
    conditions: [{
      type: 'blockInterval',
      interval: 50_000,
      maxIntervals: 12
    }],
    replay: {
      nonce: parseInt(nonceRes.data.nonce),
      runs: 'UNTIL_CANCELLED'
    }
  }

  const prepareRes = await axios.get('https://api.brink.trade/strategies/data/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    },
    params: {
      chainId: 1,
      signer: '0xc0ffee',
      signatureType: 'EIP712',
      include: ['required_transactions'],
      strategy: myRecurringIntent
    }
  })

  const { eip712Data } = prepareRes.data

  const walletClient = viem.createWalletClient({
    chain: mainnet,
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`),
  })

  const signature = await walletClient.signTypedData({
    account: walletClient.account,
    types: eip712Data.types,
    domain: eip712Data.domain,
    message: eip712Data.value,
    primaryType: 'MetaDelegateCall'
  })

  const submitRes = await axios.post('https://api.brink.trade/strategies/submit/v1', {
    headers: {
      'x-api-key': process.env.BRINK_API_KEY,
    },
    params: {
      chainId: 1,
      signer: '0xc0ffee',
      signatureType: 'EIP712',
      strategy: myRecurringIntent,
      signature
    }
  })

  console.log(submitRes.data)
}

main()
```