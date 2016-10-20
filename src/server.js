import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Handlebars from 'handlebars';
import Network from './jsx/network';
import fs from 'async-file';
import path from 'path';

const app = express();

async function loadTemplate(templateName) {
    const templatePath = path.resolve(__dirname, '..',  'templates', `${templateName}.hbs`);
    const fileSource =  await fs.readFile(templatePath, 'utf-8');
    return Handlebars.compile(fileSource);
}

app.get(
    '/',
    async function(request, response) {
        const template = await loadTemplate('index');
        const component = ReactDOMServer.renderToString(
            React.createElement(Network, {})
        );
        response.send(
            template({ component })
        );
    }
);

app.get(
    '/api/network.json',
    (request, response) => {
        response.send({
            nodes: [
                {
                    id: 'API',
                    name: 'Component API',
                    group: 1
                },
                {
                    id: 'Redis',
                    name: 'Component Redis',
                    group: 2
                }
            ],
            links: [
                {
                    source: 'API',
                    target: 'Redis',
                    value: 1
                }
            ]
        })
    }
)

app.use(
    '/dist',
    express.static('dist')
);

app.listen(
    8080,
    () => console.log('Listening on port 8080')
);