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

                if (!_.isEqual(json, component.state[k])) {
                    component.setState({ [k]: json });
                }
            });

        }
        componentWillMount() {
            this.fetchData();
        }
        componentDidMount() {
            setInterval(
                () => this.fetchData(),
                1000
            );
        }
        render() {
            return (
                <ReactComponent {...this.props} {...this.state} />
            )
        }
    }
}