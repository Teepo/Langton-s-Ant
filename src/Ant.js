import React    from 'react';
import ReactDOM from 'react-dom';

export class Ant extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            x           : 20,
            y           : 20,
            rotation    : 0,
            side        : 0,
            currentCell : this.props.cell
        };
    }

    render() {

        if ((this.state.currentCell.state.coords.x === this.state.x
           && this.state.currentCell.state.coords.y === this.state.y)

           || this.state.currentCell.state.antIsHere === true) {

            this.props.App.currentCell = this.state.currentCell;
            this.props.App.currentCell.state.antIsHere = true;

            this.props.App.ant = this;
        }
        else {
            return false;
        }

        const __antClassName = "ant _" + this.state.rotation;

        return <div className={__antClassName}></div>;
    }
}
