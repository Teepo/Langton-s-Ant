var Ant = React.createClass({

    getInitialState: function() {

        return {
            x : 50,
            y : 50,
            rotation : 0,
            side : 0,
            currentCell : this.props.cell
        };
    },

    render: function() {

        if ((this.state.currentCell.state.coords.x == this.state.x
           && this.state.currentCell.state.coords.y == this.state.y)

           || this.state.currentCell.state.antIsHere === true)
        {
            this.props.App.currentCell = this.state.currentCell;
            this.props.App.currentCell.state.antIsHere = true;

            this.props.App.ant = this;
        }
        else
        {
            return false;
        }

        var __antClassName = "ant _" + this.state.rotation;

        return (<div className={__antClassName}></div>);
    }
});
