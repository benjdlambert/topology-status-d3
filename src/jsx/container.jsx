import React from 'react';
import _ from 'lodash';
import 'whatwg-fetch';

import { get, set } from './state';


export default function create(ReactComponent, config) {
    return class Container extends React.Component {
        constructor(props) {
            this.state = {};
            this.requirements = config.data(props);
        }
        async fetchData() {
            for (let dataSource of this.requirements) {
                console.log(dataSource);
            }
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