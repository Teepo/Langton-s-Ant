import { h, Component } from 'preact';

export class Ant extends Component {

    constructor(props) {

        super(props);

        this.state = {
            x           : 50,
            y           : 50,
            rotation    : 0,
            side        : 0
        };
    }

    render() {

        if ((this.props.cell.state.coords.x === this.state.x
           && this.props.cell.state.coords.y === this.state.y)

           || this.props.cell.state.antIsHere === true) {

            this.props.App.currentCell = this.props.cell;
            this.props.App.currentCell.state.antIsHere = true;

            this.props.App.ant = this;
        }
        else {
            return;
        }

        const __antClassName = "ant _" + this.state.rotation;

        return <div className={__antClassName}></div>;
    }
}
