import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import NetworkGraph from './network';

export default function routes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={NetworkGraph} />
        </Router>
    );
}