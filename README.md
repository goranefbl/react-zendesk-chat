# React Zen Desk Component

A handy ReactJS component to be used for loading ZenDesk Chat into your website or web app. SSR supported.
If you are using your own button to start a chat, script wont run until then, which helps with speed performance, especially Lighthouse.

## Install

```
$ npm install @goranefbl/react-zendesk-chat
```

## Usage

To use this module, just import the library and use like:

```js
import ZenDeskChat from '@goranefbl/react-zendesk-chat';

<Chat
    appID="YOUR_ZENDESK_CHAT_APP_ID"
    onlineMsg="Live Chat Help"
    offlineMsg="Leave us a message"
    buttonID="js-livechat-open"
    alwaysShow
/>;
```

buttonID is the ID of a button that will make chat widget appear when clicked. Or pass alwaysShow prop to make chat widget always visible on page. In the first case, script wont run at all until button is clicked which helps with speed performance, so thats prefered way of using it.

Thanks [@leljak](https://github.com/leljak) for async idea.

## License

MIT © Goran Jakovljevic
