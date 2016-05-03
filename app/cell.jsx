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

    componentDidUpdate : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.currentCell = this;
        }
    },

    componentDidMount : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.currentCell = this;
        }
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        var cellClassName = this.state.isBlack ? 'black' : '';

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            cellClassName += " ant _" + this.props.App.state.ant.rotation;
        }

        return (<td className={cellClassName} onClick={this.onClick}></td>);
    }
});