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

        var cellClassName = this.state.isBlack ? 'black' : '';

        return (<td className={cellClassName} onClick={this.onClick}>
                  <Ant cell={this} />
                </td>);
    }
});