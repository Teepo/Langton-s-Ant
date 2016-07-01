import Cell from './Cell.jsx';

var Row = React.createClass({

    getInitialState: function() {
        return {
            x : this.props.x
        };
    },

    render: function() {

        return (<tr>
                    {[...Array(this.props.App.state.gridSize.y)].map(function(o, index) {
                        return <Cell key={index} x={this.props.x} y={index} App={this.props.App} />
                    }.bind(this))}
                </tr>);
    }
});

module.exports = Row;