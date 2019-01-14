# React Zen Desk Component

A handy ReactJS component to be used for loading ZenDesk Chat into your website or web app.

## Install

```
$ npm install @goranefbl/react-zendesk-chat
```

## Usage

To use this module, just import the library and use like:

```js
import ZenDeskChat from "@goranefbl/react-zendesk-chat";

<Chat
    appID="YOUR_ZENDESK_CHAT_APP_ID"
    onlineMsg="Live Chat Help"
    offlineMsg="Leave us a message"
    buttonID="js-livechat-open"
    alwaysShow
/>;
```

buttonID is the ID of a button that will make chat widget appear when clicked. Or pass alwaysShow prop to make chat widget always visible on page.

## License

MIT © Goran Jakovljevic
