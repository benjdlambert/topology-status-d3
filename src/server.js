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
                    id: 0,
                    label: 'End User',
                    group: 'working/user'

                },
                {
                    id: 1,
                    label: 'API',
                    group: 'working/asg'
                },
                {
                    id: 2,
                    label: 'Redis',
                    group: 'broken/redis'
                },
                {
                    id: 3,
                    label: 'Template Renderers',
                    group: 'broken/asg'
                },
                {
                    id: 4,
                    label: 'Service Brokers',
                    group: 'broken/asg'
                }
            ],
            edges: [
                {
                    from: 0,
                    to: 1,
                    label: '/vegas',
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                    color: 'green'
                },
                {
                    from: 1,
                    to: 2,
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                    color: 'red'
                },
                {
                    from: 3,
                    to: 2,
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                    color: 'red'
                },
                {
                    from: 4,
                    to: 2,
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                    color: 'red'
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