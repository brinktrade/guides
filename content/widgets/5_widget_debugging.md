---
title: Widget Debugging
excerpt: "Debugging @brinkninja/widgets"
slug: widgets/debugging
category: 65ca4e8f54dda9007a445556
---

The @brinkninja/widgets comes with a debugging mode that allows you to see additional values and information for debugging purposes. To enable debug mode, simply add `?brinkwidget=debug` to the URL of the web page where the widget is embedded.

## Enabling Debug Mode

Simply add `?brinkwidget=debug` to the URL. After that, the widget will enter debug mode, displaying additional values and information.

## Example

For example, if your web page URL is **https://example.com** and the widget is embedded in the **/page** route. 

Debug mode would be enabled like this:
```bash
https://example.com/page?brinkwidget=debug
```

## Debug Mode View List

Debug mode currently shows additional values and information in these views:
    - "My Swaps" view

    ### My Swaps
    Enabling debug mode shows an additional dots button where you can see the intent hash.

    ![myswapsdebugg](https://raw.githubusercontent.com/brinktrade/guides/main/assets/myswapsdebugg.png)


