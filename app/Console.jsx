String.prototype.toHHMMSS = function () {

    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return hours + ':' + minutes + ':' + seconds;
};

var Console = React.createClass({

    getInitialState: function() {

        return {
            movementID    : 0,
            movementLimit : 10000,
            timeElapsed   : 0
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

    onZoom: function(e) {

        // enter key
        if (e.charCode === 13)
            document.querySelector('.grid').style.zoom = parseInt(e.target.value) / 100;
    },

    onPlayClickEvent: function() {

        this.props.App.__proto__.isPlay = !this.props.App.__proto__.isPlay;

        if (this.props.App.__proto__.isPlay)
            this.props.App.play();
        else
            this.props.App.pause();
    },

    onNextClickEvent: function() {
        this.props.App.nextState();
    },

    onStopClickEvent: function() {

        this.props.App.stop();
    },

    render: function() {

        var App = this.props.App;

        var playStateClassName = ((!this.props.App.isPlay) ? 'play' : 'pause') + "State state";

        var __time = ("" + this.state.timeElapsed).toHHMMSS();

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">

                              ZOOM = <input type="text" onKeyPress={this.onZoom} defaultValue={this.props.App.zoom} />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent}></div>
                            </div>
                        </div>
                    </div>

                  <div className="movementID">
                      {this.state.movementID}
                  </div>
                  <div className="time">
                      {__time}
                  </div>

                </div>);
    }
});

module.exports = Console;