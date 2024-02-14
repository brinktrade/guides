---
title: Theme Customization
excerpt: "Customizing @brinkninja/widgets theme"
slug: widgets/theme-customization
category: 65ca4e8f54dda9007a445556
---


To personalize the design of the widget, simply head over to the [Brink Widget Studio](https://brink-widget-studio.vercel.app/) for an interactive theme customization experience.

## Theme customization example

The **theme** prop attribute enables customization of the widget theme's *mode, colors, shape, and slot* properties.

```typescript theme.ts
  import { RecurringSwapWidget } from '@brinkninja/widgets'

  <RecurringSwapWidget
    apiKey="apiKey"
    appName="appName"
    theme={{
      mode: 'dark',
      shape: {
        roundedBtn: '100px',
        roundedBox: '20px',
        roundedFormField: '12px'
      },
      slot: { tabsInContainer: false },
      colors: {
        primary: {
          '100': 'rgb(233, 239, 244)',
          '200': 'rgb(211, 224, 234)',
          '300': 'rgb(189, 209, 223)',
          '400': '#236896',
          '500': 'rgb(31, 93, 135)',
          '600': 'rgb(28, 83, 120)',
          '700': 'rgb(24, 72, 105)',
          main: '#236896'
        },
        secondary: {
          '100': 'rgb(242, 248, 244)',
          '200': 'rgb(230, 242, 233)',
          '300': 'rgb(218, 236, 222)',
          '400': '#85c294',
          '500': 'rgb(119, 174, 133)',
          '600': 'rgb(106, 155, 118)',
          '700': 'rgb(93, 135, 103)',
          main: '#85c294'
        },
        neutral: {
          '100': 'rgb(246, 246, 246)',
          '200': 'rgb(237, 237, 237)',
          '300': 'rgb(228, 228, 228)',
          '400': '#a5a5a5',
          '500': 'rgb(148, 148, 148)',
          '600': 'rgb(132, 132, 132)',
          '700': 'rgb(115, 115, 115)',
          main: '#a5a5a5'
        },
        informative: {
          '100': 'rgb(231, 244, 245)',
          '200': 'rgb(208, 234, 235)',
          '300': 'rgb(185, 224, 226)',
          '400': '#17989f',
          '500': 'rgb(20, 136, 143)',
          '600': 'rgb(18, 121, 127)',
          '700': 'rgb(16, 106, 111)',
          main: '#17989f'
        },
        error: {
          '100': 'rgb(244, 231, 231)',
          '200': 'rgb(233, 208, 208)',
          '300': 'rgb(222, 185, 185)',
          '400': '#921717',
          '500': 'rgb(131, 20, 20)',
          '600': 'rgb(116, 18, 18)',
          '700': 'rgb(102, 16, 16)',
          main: '#921717'
        },
        success: {
          '100': 'rgb(236, 242, 232)',
          '200': 'rgb(218, 229, 209)',
          '300': 'rgb(200, 216, 187)',
          '400': '#4a801d',
          '500': 'rgb(66, 115, 26)',
          '600': 'rgb(59, 102, 23)',
          '700': 'rgb(51, 89, 20)',
          main: '#4a801d'
        },
        warning: {
          '100': 'rgb(247, 240, 231)',
          '200': 'rgb(239, 225, 207)',
          '300': 'rgb(231, 210, 183)',
          '400': '#b16a11',
          '500': 'rgb(159, 95, 15)',
          '600': 'rgb(141, 84, 13)',
          '700': 'rgb(123, 74, 11)',
          main: '#b16a11'
        },
        text: {
          primary: '#ffffff',
          secondary: '#A5A5A5',
          disabled: '#A5A5A5'
        },
        background: {
          paper: '#222222',
          base100: '#535353',
          base200: '#393939',
          base300: '#222222'
        }
      }
    }}
  />
```

## Styling via CSS

If theme customization is not enough, you can also style each Widget component via CSS.

Here is the list of available CSS selectors:

  - {widget-type}=eg. **recurring-swap** or "*other-widget-type-name*"

  ### Widget id selectors

  - Widget: brink-{widget-type}-widget
  - Widget container: brink-{widget-type}-widget-container
  - Widget swap container: brink-{widget-type}-form-container
  - Widget swap btn: brink-{widget-type}-swap-btn
  - Widget sell container: brink-{widget-type}-sell-container
  - Widget receive container: brink-{widget-type}-receive-container
  - Widget frequency container: brink-{widget-type}-frequency-container
  - Widget interval container: brink-{widget-type}-reoccurrence-container
  - Widget submit intent button: brink-{widget-type}-submit-intent-btn

  - Multistep container: brink-{widget-type}-multistep-container
  - Transactions container: brink-recurring-swap-transactions-container
  - Transactions pagination: brink-recurring-swap-transactions-pagination
  - Widget tabs: brink-recurring-swap-tabs

  ### Widget class selectors

  - Widget: .brink-widget
  - Widget container: .brink-widget-container
  - Widget swap container: .brink-swap-container
  - Widget form container: .brink-widget-form-container
  - Widget token-selector container: .brink-widget-token-selector-container
  - Widget multistep container: .brink-widget-multistep-container
  - Widget multifield container: .brink-multifield-container
  - Widget submit btn: .brink-widget-submit-intent-btn
  - Widget transactions container: .brink-transactions-container
  - Widget tabs: .brink-widget-tabs, .brink-widget-tab, .brink-widget-tab--selected

  ### Widget component class selectors

  - .brink-header
  - .brink-icon-button
  - .brink-dropdown
  - .brink-dropdown-button
  - .brink-select
  - .brink-interval
  - .brink-swap-btn
  - .brink-list
  - .brink-list-item
  - .brink-pagination

CSS customization example:

```scss theme.scss
$white: #FFFFFF;
$black: #000000
$theme-bg: #FBD600;

#brink-recurring-swap-widget {
  box-shadow: -8px 8px 0px $black;
  background: $theme-bg;
  padding: 12px;
  width: 100%;

  .brink-widget-form-container {
    @media only screen and (min-width: 450px) {
      min-width: 400px;
      max-width: 400px;
    }
  }

  .brink-multifield-container {
    outline: 2px solid $black;
  }
}
```

