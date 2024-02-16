---
title: Provider customiaztion
excerpt: "Customizing @brinkninja/widgets providers which are used under the hood"
slug: widgets/provider-customization
category: 65ca4e8f54dda9007a445556
---

Widgets are designed to utilize different providers behind the scenes. 
Each of those providers can be disabled, and replaced with your own custom providers.

List of providers which are currenlty used by widget:

    - [Wagmi provider](https://wagmi.sh/)
    - [Rainbowkit provider](https://www.rainbowkit.com/docs/installation)
    - [QueryClient provider](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider)
    - [Material provider](https://mui.com/material-ui/customization/theming/)

## Example: Overriding Wagmi Provider

For Wagmi configuration docs refer to official [Wagmi site](https://wagmi.sh/react/getting-started).

```typescript wagmi.ts

// Disable Wagmi Provider

<RecurringSwapWidget disableWagmiProvider />

// Create your own Wagmi Config
import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [
    jsonRpcProvider({
      rpc: chain => {
        if (chain.id === 1) {
          return {
            http: `https://eth-mainnet.g.alchemy.com/v2/`
          }
        } else if (chain.id === 137) {
          return {
            http: `https://polygon-mainnet.g.alchemy.com/v2/`
          }
        }
      }
    }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  chains,
  appName: 'appName',
  projectId: "walletConnectProjectId"
})

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors
})

// Add custom provider to your App

ReactDOM.render(
  <WagmiProvider config={wagmiConfig}>
    <App />
  </WagmiProvider>,
  document.getElementById('root')
);

```

## Example: Overriding Rainbowkit Provider
For Rainbowkit configuration docs refer to official [Rainbowkit site](https://www.rainbowkit.com/docs/installation).

```typescript rainbowkit.ts

// Disable Rainbowkit Provider

<RecurringSwapWidget disableRainbowkitProvider />

// Add custom provider to your App
import { configureChains } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'

const { chains } = configureChains(
  [mainnet, polygon],
  [
    jsonRpcProvider({
      rpc: chain => {
        if (chain.id === 1) {
          return {
            http: `https://eth-mainnet.g.alchemy.com/v2/`
          }
        } else if (chain.id === 137) {
          return {
            http: `https://polygon-mainnet.g.alchemy.com/v2/`
          }
        }
      }
    }),
    publicProvider()
  ]
)

ReactDOM.render(
  <RainbowKitProvider appInfo={{ appName: 'appName' }} chains={chains}>
    <App />
  </RainbowKitProvider>,
  document.getElementById('root')
);

```

## Example: QueryClient provider
For QueryClient configuration docs refer to official [ReactQuery site](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider).

```typescript queryClient.ts

// Disable QueryClient Provider

<RecurringSwapWidget disableQueryClientProvider />

// Add custom provider to your App

import { QueryClient, QueryClientProvider } from '@react-query/query-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Additional query options...
    },
    mutations: {
      // Additional mutation options...
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);

```

## Example: Theme Provider

While it is possible to disable the theme provider, it is not recommended to do so. For any theme customizations, please refer to our [theme customization documentation](/widgets/theme-customization).

```typescript theme.ts

// Disable Theme Provider

<RecurringSwapWidget disableMuiProvider />

// Add custom provider to your App
import { Theme } from '@brinkninja/components'

ReactDOM.render(
  <MuiThemeProvider theme={Theme.getTheme('light')}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

or

ReactDOM.render(
  <MuiThemeProvider theme={YourCustomTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

```


