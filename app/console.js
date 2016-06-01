var Console = React.createClass({

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });
    },

    onZoom: function(e) {
        document.querySelector('.grid').style.zoom = parseInt(e.target.value) / 100;
    },

    onPlayClickEvent: function() {

        this.props.App.__proto__.isPlay = !this.props.App.__proto__.isPlay;

        if (this.props.App.__proto__.isPlay)
            this.props.App.play();
    },

    onNextClickEvent: function() {
        this.props.App.play();
    },

    onStopClickEvent: function() {

        this.props.App.isPlay = false;
        this.props.App.isStop = true;
    },

    render: function() {

        var App = this.props.App;

        var playStateClassName = ((!this.props.App.isPlay) ? 'play' : 'pause') + "State state";

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">

                              <input type="range" value={this.props.App.zoom} onChange={this.onZoom} min="10" max="100" />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent}></div>
                            </div>
                        </div>
                    </div>

                </div>);
    }
});