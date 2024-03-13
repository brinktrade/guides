---
title: Intent JSON builder
excerpt: "Brink's intent JSON builder guide"
slug: intent-json-builder/guide
category: 65e89562669a72000fe9c894
---


Welcome to Brink's Intent JSON Builder Guide! Here, you'll find everything you need to know about submitting intents effortlessly using JSON input. Experience the seamless functionality firsthand by trying it out live at [Brink's intent JSON builder](https://demo.brink.trade/). Let's get started!

## Brink DSL Reference
To utilize Brink's Intent JSON Builder effectively, it's essential to understand the Brink DSL that governs its functionality. Referencing the [Brink DSL reference documents](https://docs.brink.trade/reference/dsl-overview) will provide you with detailed insights into the syntax and structure required for constructing intents.

## Constructing Intents with the Editor
Once you've acquainted yourself with the [Brink DSL](https://docs.brink.trade/reference/dsl-overview), you're ready to start building intents using the Brink Intent JSON Builder editor.

Please ensure that the content in the editor is in **.json** file format. Additionally, verify that the **chainId** and **owner** values align with your connected network and wallet address, respectively.

To format JSON, use **CMD/CTRL + Enter** for seamless organization.

![intentjsonbuildereditor](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder.png)

## Next available Nonce with Editor
When constructing your intent, you may need to know the next available nonce. You can do this by using the **Next Nonces** section in the editor.

![intentjsonbuilder_nonce_section](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_nonce_section.png)

If you require multiple nonces for constructing your intent, simply edit the **Next Nonces** input field with the desired quantity.

![intentjsonbuilder_nonce_multiple](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_nonce_multiple.png)

## Compiling DSL
After construting your Intent JSON, you're ready to compile it. To do so, click the **Compile** button.

![intentjsonbuilder_compile](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_compile.png)

### Compiling DSL Error's
If you encounter any errors while compiling your intent, you will be notified in the editor.

![intentjsonbuilder_compile_error](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_compiler_error.png)

> ❌ Compiling DSL Error
>
> If you stumble upon any errors while compiling your intent that you are not able to resolve, [contact us on Discord](https://discord.gg/NNx4Y7XB "brink discord").

### Approve Step
After successfully compiling the DSL intent, if you don't have enough tokens approved for usage, you will encounter the approval step. Here, you can approve the required amount of tokens.

![intentjsonbuilder_approve](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_approve.png)

### Deposit Step
After successfully compiling the DSL intent, if the token in use is a native token. You will need to wrap this native token into its wrapped counterpart. 

![intentjsonbuilder_deposit](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_deposit.png)


### Sign & Submit
After successfully compiling the DSL intent, you are ready to sign it in your wallet. After signing, you can submit it to the network.

![intentjsonbuilder_sign_submit](https://raw.githubusercontent.com/brinktrade/guides/main/assets/intentjsonbuilder_sign_submit.png)
