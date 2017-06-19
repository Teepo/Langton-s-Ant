import React    from 'react';
import ReactDOM from 'react-dom';

import { Row } from './Row';

export class Rows extends React.Component {

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
