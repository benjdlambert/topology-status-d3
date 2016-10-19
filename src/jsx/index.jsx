import React from 'react';
import App from './app';

export default function Index() {
    return (
        <html>
            <head>
                <link rel="stylesheet" href="/static/css/network.css" />
            </head>
            <body>
                <App />
                <script type="text/javascript" src="/dist/vendor/react.js"></script>
                <script type="text/javascript" src="/dist/vendor/react-dom.js"></script>
                <script type="text/javascript" src="/dist/vendor/es6-promise.js"></script>
                <script type="text/javascript" src="/dist/vendor/fetch.js"></script>
                <script type="text/javascript" src="/dist/pack.js"></script>
                <script type="text/javascript">
                    ReactDOM.render(
                        React.createElement(
                          Index.default,
                          {}
                        ),
                        document.documentElement
                    )
                </script>
            </body>
        </html>
    )
}