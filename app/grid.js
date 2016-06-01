var Grid = React.createClass({

    getInitialState: function() {
        return {
            gridSize: {
                x : 11,
                y : 11
            }
        };
    },

    render: function() {

        return (<table className="grid">
                    <tbody>
                        {[...Array(this.props.App.state.gridSize.x)].map(function(o, index) {
                            return <Row key={index} x={index} App={this.props.App} />
                        }.bind(this))}
                    </tbody>
                </table>);
    }
});