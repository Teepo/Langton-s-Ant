var Console = React.createClass({

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });

    },

    render: function() {

        var App = this.props.App;

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              &nbsp;
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">
                            </div>
                        </div>
                    </div>

                </div>);
    }
});