import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Index from './jsx/index';

const app = express();
app.get('/', (request, response) =>
    response.send(
        ReactDOMServer.renderToString( React.createElement(Index, {}))
    );
);

app.listen(
    8080,
    () => console.log('Listening on port 8080')
);