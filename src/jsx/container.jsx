import React from 'react';
import _ from 'lodash';
import 'whatwg-fetch';

import { get, set } from './state';

export default function create(ReactComponent, config) {
    return class Container extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.requirements = config.data(props);
        }
        async fetchData() {
            const component = this;
            const fetches = _.map(this.requirements, async function(value, k) {
                const request = await fetch(value);
                const json = await request.json();
                component.setState({ [k]: value });
            });
        }
        componentWillMount() {
            this.fetchData();
        }
        componentDidMount() {
            //poll for changes
        }
        render() {
            return (
                <ReactComponent {...this.props} {...this.state} />
            )
        }
    }
}