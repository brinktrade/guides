---
title: Installing the Widget
excerpt: "Guide for installing widget in your application"
slug: widgets/installing-the-widget
category: 65ca4e8f54dda9007a445556
---

> 📘 Widget API Key
>
> To use the widget you need to get Widget API Key & Widget API Key Name. Please [contact us on Discord](https://discord.gg/NNx4Y7XB "brink discord") to get yours!

## Installation

Install the Brinkninja Widget npm package:

```sh
npm install @brinkninja/widgets
```

or

```sh
yarn install @brinkninja/widgets
```

or

```sh
pnpm add @brinkninja/widgets
```

## Adding widget to your application

```typescript
import '@brinkninja/widgets/styles.css' // Only for animations
import { RecurringSwapWidget } from '@brinkninja/widgets'
// ...

<RecurringSwapWidget
  apiKey="apiKey"
  apiKeyName="apiKeyName"
  appName="apiKeyName"
  // other config options
/>
```