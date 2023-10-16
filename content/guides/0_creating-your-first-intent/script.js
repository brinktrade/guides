// Run: `$ npm run guide-0` in the terminal to execute this script

const axios = require('axios')
const viem = require('viem')
const { mainnet } = require('viem/chains')
const { privateKeyToAccount } = require('viem/accounts')
require('dotenv').config()

const signerPublicAddress = '0xcEd90a58Ba727ABa04bb8C11a3b40a1c866b36F0'

const main = async () => {
  const nonceRes = await axios.get(
    `https://api.brink.trade/signers/${signerPublicAddress}/nonces/v1`,
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY
      }
    }
  )

  const myRecurringIntent = {
    actions: [
      {
        type: 'marketSwap',
        owner: signerPublicAddress, // EOA public address of signer
        tokenInAmount: 500000000, // 500 USDC (6 decimals)
        tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
        fee: 2.5 // incentivize solver with 2.5% of the swap
      }
    ],
    conditions: [
      {
        id: '1234567890', // unique ID for condition, perferably randomly generated
        type: 'interval',
        interval: 50_000, // ~50,000 blocks are built every 7 days
        maxIntervals: 12 // 7 days * 12 === 12 weeks or 3 months
      }
    ],
    replay: {
      nonce: parseInt(nonceRes.data.nonces[0]), // nonce value from API response
      runs: 'ONCE'
    }
  }

  const compileRes = await axios.get(
    'https://api.brink.trade/intents/compile/v1',
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY
      },
      params: {
        chainId: 1,
        signer: signerPublicAddress,
        signatureType: 'EIP712',
        include: ['required_transactions'],
        declaration: JSON.stringify(myRecurringIntent)
      }
    }
  )

  const { eip712Data } = compileRes.data

  const walletClient = viem.createWalletClient({
    chain: mainnet,
    transport: viem.http(),
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`)
  })

  const declarationSignature = await walletClient.signTypedData({
    account: walletClient.account,
    types: eip712Data.types,
    domain: eip712Data.domain,
    message: eip712Data.value,
    primaryType: 'MetaDelegateCall'
  })

  const submitRes = await axios.post(
    'https://api.brink.trade/intents/submit/v1',
    {
      chainId: 1,
      signer: signerPublicAddress,
      signatureType: 'EIP712',
      declaration: compileRes.data.declaration, // compiled declaration from compile request
      signature: declarationSignature // signature hash from signTypedData
    },
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY
      }
    }
  )

  console.log(submitRes.data)
}

main()
