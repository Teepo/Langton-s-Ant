import React    from 'react';
import ReactDOM from 'react-dom';

import { Cell } from './Cell';

export class Row extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            x : this.props.x
        };
    }

    render() {

        return <tr>
                    {[...Array(this.props.App.state.gridSize.y)].map((o, index) => {
                        return <Cell key={index} x={this.state.x} y={index} App={this.props.App} />
                    })}
                </tr>;
    }
};
