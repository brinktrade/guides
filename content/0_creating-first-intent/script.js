const axios = require('axios')
const viem = require('viem')
const { mainnet } = require('viem/chains')
const { privateKeyToAccount } = require('viem/accounts')
require('dotenv').config()

const myRecurringIntent = {
  orders: [
    {
      primitives: [
        {
          functionName: 'useBit',
          params: {
            index: '0',
            value: '4096'
          },
          requiresUnsignedCall: false
        },
        {
          functionName: 'requireBlockNotMined',
          params: {
            blockNumber: '10000000000000000001'
          },
          requiresUnsignedCall: false
        },
        {
          functionName: 'requireUint256LowerBound',
          params: {
            oracle: {
              address: '0x74bc6232d7b5cf8db6dd5cb8264e9cca6beed605',
              params:
                '0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640000000000000000000000000000000000000000000000000000000000000003c',
              tokenA: {
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                standard: 0,
                idsMerkleRoot:
                  '0x0000000000000000000000000000000000000000000000000000000000000000',
                id: '0',
                disallowFlagged: false
              },
              tokenB: {
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                standard: 0,
                idsMerkleRoot:
                  '0x0000000000000000000000000000000000000000000000000000000000000000',
                id: '0',
                disallowFlagged: false
              },
              isInverse: true
            },
            lowerBound: '79228162514264342528'
          },
          requiresUnsignedCall: false
        },
        {
          functionName: 'marketSwapExactInput',
          params: {
            oracle: {
              address: '0x74bc6232d7b5cf8db6dd5cb8264e9cca6beed605',
              params:
                '0x00000000000000000000000088e6a0c2ddd26feeb64f039a2c41296fcb3f5640000000000000000000000000000000000000000000000000000000000000003c'
            },
            signer: '0xcEd90a58Ba727ABa04bb8C11a3b40a1c866b36F0',
            tokenIn: {
              address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
              standard: 0,
              idsMerkleRoot:
                '0x0000000000000000000000000000000000000000000000000000000000000000',
              id: '0',
              disallowFlagged: false
            },
            tokenOut: {
              address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
              standard: 0,
              idsMerkleRoot:
                '0x0000000000000000000000000000000000000000000000000000000000000000',
              id: '0',
              disallowFlagged: false
            },
            tokenInAmount: '188888111100000007',
            feePercent: '490107',
            feeMin: '36829802'
          },
          requiresUnsignedCall: true
        }
      ]
    }
  ]
}

const step1 = async () => {
  const nonceRes = await axios.get(
    'https://api.brink.trade/signers/0xcEd90a58Ba727ABa04bb8C11a3b40a1c866b36F0/nextAvailableBit/v1',
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY
      }
    }
  )

  // const myRecurringIntent = {
  //   actions: [
  //     {
  //       type: 'marketSwap',
  //       tokenInAmount: 5000.0,
  //       tokenIn: 'USDC',
  //       tokenOut: 'ETH',
  //       fee: 2.5 // incentivize solver with 2.5% of the swap
  //     }
  //   ],
  //   conditions: [
  //     {
  //       type: 'blockInterval',
  //       interval: 50_000, // ~7 days
  //       maxIntervals: 12 // 7 days * 12 === 12 weeks or 3 months
  //     }
  //   ],
  //   replay: {
  //     nonce: parseInt(nonceRes.data.nonce),
  //     runs: 'UNTIL_CANCELLED'
  //   }
  // }

  // console.log(myRecurringIntent)
  const intentResponse = await axios.get(
    'https://api.brink.trade/strategies/data/v1',
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY,
        accept: 'application/json'
      },
      params: {
        chainId: 1,
        signer: '0xcEd90a58Ba727ABa04bb8C11a3b40a1c866b36F0',
        signatureType: 'EIP712',
        include: ['required_transactions'],
        strategy: JSON.stringify(myRecurringIntent)
      }
    }
  )

  const { eip712Data } = intentResponse.data

  const walletClient = viem.createWalletClient({
    chain: mainnet,
    transport: viem.http(),
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`)
  })

  const signature = await walletClient.signTypedData({
    account: walletClient.account,
    types: eip712Data.types,
    domain: eip712Data.domain,
    message: eip712Data.value,
    primaryType: 'MetaDelegateCall'
  })

  const submitResponse = await axios.post(
    'https://api.brink.trade/strategies/submit/v1',
    {
      headers: {
        'x-api-key': process.env.BRINK_API_KEY,
        accept: 'application/json'
      },
      data: {
        chainId: 1,
        signer: walletClient.account.address,
        signatureType: 'EIP712',
        signature,
        strategy: JSON.stringify(myRecurringIntent)
      }
    }
  )

  // const submitResponse = await axios.post(
  //   'https://api.brink.trade/strategies/submit/v1',
  //   {
  //     chainId: 1,
  //     signer: walletClient.account.address,
  //     signatureType: 'EIP712',
  //     signature,
  //     strategy: JSON.stringify(myRecurringIntent)
  //   },
  //   {
  //     headers: {
  //       'x-api-key': process.env.BRINK_API_KEY,
  //       accept: 'application/json'
  //     }
  //   }
  // )

  console.log(submitResponse.data)
}

step1()
