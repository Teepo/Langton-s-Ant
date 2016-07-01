var Console = React.createClass({

    getInitialState: function() {

        return {
            movementID : 0,
            movementLimit : 10000
        };
    },

    componentDidMount: function() {

        // store reference in <App />
        this.props.App.__proto__.console = this;
    },

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });
    },

    onChangeZoom: function(e) {
    },

    onZoom: function(e) {

        // enter key
        if (e.charCode === 13)
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

                              <input type="text" onKeyPress={this.onZoom} defaultValue={this.props.App.zoom} />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent}></div>
                            </div>
                        </div>
                    </div>

                  <div className="movementID">
                      {this.state.movementID}
                  </div>

                </div>);
    }
});