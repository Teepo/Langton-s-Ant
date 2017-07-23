import { h, Component } from 'preact';

import { Rows } from './Rows';

export class Grid extends Component {

    constructor() {

        super();

        this.state = {

            gridSize: {
                x : 100,
                y : 100
            }
        };
    }

    render() {

        return <table className="grid">
                   <Rows App={this.props.App} />
               </table>;
    }
}
