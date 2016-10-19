import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Index from './jsx/index';

const app = express();
app.get('/', (request, response) => {
    const Component = React.createElement(Index, {});
    response.send(ReactDOMServer.renderToString(Component));
});

app.listen(8080, () => console.log('Listening on port 8080'));