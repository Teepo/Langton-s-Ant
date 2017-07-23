import { h, Component } from 'preact';

import { Row } from './Row';

export class Rows extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return <tbody>
                  {[...Array(this.props.App.state.gridSize.x)].map((o, index) => {
                    return <Row key={index} x={index} App={this.props.App} />
		          })}
                </tbody>;
    }
}
