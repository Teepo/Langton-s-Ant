import Ant from './Ant.jsx';

var Cell = React.createClass({

    getInitialState: function() {

        return {
            isBlack : false,

            antIsHere : false,

            coords: {
                x : this.props.x,
                y : this.props.y
            }
        };
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        if (typeof this.props.App.__proto__.cells[this.state.coords.x] === "undefined")
            this.props.App.__proto__.cells[this.state.coords.x] = [];

        this.props.App.__proto__.cells[this.state.coords.x][this.state.coords.y] = this;

        var cellClassName = this.state.isBlack ? 'black' : '';

        return (<td className={cellClassName} onClick={this.onClick}>
            <Ant App={this.props.App} cell={this} />
            </td>);
    }
});

module.exports = Cell;