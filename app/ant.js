var Ant = React.createClass({

    getInitialState: function() {

        return {
            x : 5,
            y : 5,
            rotation: 0,
            side: 0
        };
    },

    render: function() {

        if (this.props.cell.state.coords.x == this.state.x
           && this.props.cell.state.coords.y == this.state.y) {}
        else
            return false;

        var __antClassName = "ant _" + this.state.rotation;

        return (<div className={__antClassName}></div>);
    }
});