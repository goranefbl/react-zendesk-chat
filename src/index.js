/* eslint-disable */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ZendeskChat extends PureComponent {
    componentDidMount() {
        const { alwaysShow, buttonID } = this.props;
        if (alwaysShow) {
            this.initZopim();
        }
        document.getElementById(buttonID).addEventListener('click', this.initZopim);
    }

    componentWillUnmount() {
        if (window.$zopim) {
            delete window.$zopim;
        }
    }

    initZopim = () => {
        const { appID } = this.props;

        if (appID === undefined) {
            console.log('Missing Zopim App ID. Please add it.');
            return false;
        }

        if (!window.$zopim) {
            const load = (function(document, script, appID) {
                return new Promise(function(resolve, reject) {
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

                    // Important success and error for the promise
                    $.onload = () => {
                        resolve();
                    };

                    $.onerror = () => {
                        reject(new Error('Zopim API load error.'));
                    };
                });
            })(document, 'script', appID);

            load.then(() => {
                this.chatBoxEvents();
                $zopim.livechat.window.show();
            }).catch(error => {
                console.log(error);
            });
        } else {
            $zopim.livechat.window.show();
        }
    };

    chatBoxEvents = () => {
        const { onlineMsg, offlineMsg, alwaysShow } = this.props;

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
        });
    };

    render() {
        return null;
    }
}

ZendeskChat.propTypes = {
    appID: PropTypes.string.isRequired,
    onlineMsg: PropTypes.string,
    offlineMsg: PropTypes.string,
    buttonID: PropTypes.string,
    alwaysShow: PropTypes.bool
};

export default ZendeskChat;
