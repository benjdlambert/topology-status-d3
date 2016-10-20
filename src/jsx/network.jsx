import React from 'react';

import create from './container';

class NetworkComponent extends React.Component {

}

export default create(
    NetworkComponent, {
        data() {
            network: '/api/network.json'
        }
    }
)
