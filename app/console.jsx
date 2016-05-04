var Console = React.createClass({

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });

    },

    onPlayClickEvent: function() {

        this.props.App.setState({
            isPlay : !this.props.App.state.isPlay
        });
    },

    onStopClickEvent: function() {

        this.props.App.setState({
            isPlay : false,
            isStop : true
        });
    },

    render: function() {

        var App = this.props.App;

        var playStateClassName = ((!this.props.App.state.isPlay) ? 'play' : 'pause') + "State state";

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">
                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                            </div>
                        </div>
                    </div>

                </div>);
    }
});