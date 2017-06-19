import React    from 'react';
import ReactDOM from 'react-dom';

import { Rows } from './Rows';

export class Grid extends React.Component {

    constructor() {

        super();

        this.state = {

            gridSize: {
                x : 50,
                y : 50
            }
        };
    }

    render() {

        return <table className="grid">
                   <Rows App={this.props.App} />
               </table>;
    }
}
