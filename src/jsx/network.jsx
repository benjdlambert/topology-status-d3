import React from 'react';
import create from './container';
import vis from 'vis';
import _ from 'lodash';

class NetworkComponent extends React.Component {
    constructor(props) {
        super(props);
        this.references = {};
        this.state = {};
        this.graphOptions = {
            nodes: {
                shape: 'dot',
                size: 100,
                font: {
                    size: 10,
                    color: 'black'
                },
                borderWidth: 2
            },
            edges: {
                width: 2
            },
            groups: {
                'working/user': {
                    shape: 'icon',
                    icon: {
                        size: 100,
                        face: 'icomoon',
                        code: '\ue906',
                        color: 'green'
                    }

                },
                'broken/user': {
                    shape: 'icon',
                    icon: {
                         size: 100,
                        face: 'icomoon',
                        code: '\ue906',
                        color: 'red'
                    }
                },
                'working/redis': {
                    shape: 'icon',
                    icon: {
                         size: 100,
                        face: 'icomoon',
                        code: '\ue90e',
                        color: 'green'
                    }
                },
                'working/asg': {
                    shape: 'icon',
                    icon: {
                         size: 100,
                        face: 'icomoon',
                        code: '\ue900',
                        color: 'green'
                    }
                },
                'broken/redis': {
                    shape: 'icon',
                    icon: {
                         size: 100,
                        face: 'icomoon',
                        code: '\ue90e',
                        color: 'red'
                    }
                },
                'broken/asg': {
                    shape: 'icon',
                    icon: {
                         size: 100,
                        face: 'icomoon',
                        code: '\ue900',
                        color: 'red'
                    }
                }
            },
            layout: {
                randomSeed: 48970
            }
        }
    }
    updateGraph = (props = this.props) => {
        if (!props.network) {
            return;
        }

        if (!this.references.graph) {
            this.references.graph = new vis.Network(
                this.references.container,
                props.network,
                this.graphOptions
            );
        } else {
            this.references.graph.setData(
                _.cloneDeep(props.network)
            );
        }
    }
    componentDidMount() {
        this.updateGraph();
    }
    componentWillMount() {
        this.updateGraph();
    }
    componentWillReceiveProps(nextProps) {
        this.updateGraph(nextProps);
        console.log(this.references.graph.getSeed());
    }
    render() {
        return (
            <div ref={(ref) => this.references.container = ref} />
        )
    }
}

export default create(
    NetworkComponent, {
        data() {
            return {
                network: '/api/network.json'
            }
        }
    }
)
