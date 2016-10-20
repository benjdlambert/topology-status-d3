import React from 'react';

import create from './container';

class NetworkComponent extends React.Component {
    render() {
        return <h1>Test</h1>
    }
}

export default create(
    NetworkComponent, {
        data() {
            network: '/api/network.json'
        }
    }
)
