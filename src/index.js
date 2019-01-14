/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ZendeskChat extends PureComponent {
    componentDidMount() {
        const { appID } = this.props;
        if (!window.$zopim) {
            (function(document, script, appID) {
                var zopim = (window.$zopim = function(c) {
                    zopim._.push(c);
                });
                const $ = (zopim.s = document.createElement(script));
                const element = document.getElementsByTagName(script)[0];

                zopim.set = function(o) {
                    zopim.set._.push(o);
                };

                zopim._ = [];
                zopim.set._ = [];
                $.async = !0;
                $.setAttribute('charset', 'utf-8');
                $.src = `https://v2.zopim.com/?${appID}`;
                zopim.t = +new Date();
                $.type = 'text/javascript';
                element.parentNode.insertBefore($, element);
            })(document, 'script', appID);
        }
        this.chatBoxEvents();
    }

    chatBoxEvents = () => {
        const { onlineMsg, offlineMsg, buttonID, alwaysShow } = this.props;
        $zopim(function() {
            $zopim.livechat.setGreetings({
                online: onlineMsg,
                offline: offlineMsg
            });
            // Hide Chat on first load
            if ($zopim.livechat.isChatting() === false && alwaysShow !== true) {
                $zopim.livechat.hideAll();
            }
            // On hide click remove chat window if chat is not active
            $zopim.livechat.window.onHide(function() {
                if ($zopim.livechat.isChatting() === false && alwaysShow !== true) {
                    $zopim.livechat.hideAll();
                }
            });
            // Clicking on a button, brings up chat window
            document.getElementById(buttonID).addEventListener('click', function() {
                $zopim.livechat.button.show();
            });
        });
    };

    render() {
        return null;
    }
}

ZendeskChat.propTypes = {
    appID: PropTypes.string,
    onlineMsg: PropTypes.string,
    offlineMsg: PropTypes.string,
    buttonID: PropTypes.string,
    alwaysShow: PropTypes.bool
};

export default ZendeskChat;
