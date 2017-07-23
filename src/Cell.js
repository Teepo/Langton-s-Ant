import { h, Component } from 'preact';

import { Ant } from './Ant';

export class Cell extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isBlack : false,

            antIsHere : false,

            coords: {
                x : this.props.x,
                y : this.props.y
            }
        };
    }

    /**
     *
     * @listens click
     */
    onClick() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    }

    render() {

        if (typeof this.props.App.cells[this.state.coords.x] === "undefined") {
            this.props.App.cells[this.state.coords.x] = [];
        }

        this.props.App.cells[this.state.coords.x][this.state.coords.y] = this;

        const cellClassName = this.state.isBlack ? 'black' : '';

        return <td className={cellClassName} onClick={this.onClick}>
                   <Ant cell={this} App={this.props.App} />
               </td>;
    }
}
