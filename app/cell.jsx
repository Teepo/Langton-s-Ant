var Cell = React.createClass({

    getInitialState: function() {

        return {
            isBlack : false,

            coords: {
                x : this.props.x,
                y : this.props.y
            }
        };
    },

    componentWillMount : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.setState({
                currentCell : this
            });

            console.log('ANT FOUNDED');
        }
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        var cellClassName = this.state.isBlack ? 'black' : 'white';

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            cellClassName += " ant";
        }

        return (<td className={cellClassName} onClick={this.onClick}></td>);
    }
});