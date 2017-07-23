import { h, Component } from 'preact';

export class Console extends Component {

    /**
     * @param {Object} props
     *
     */
    constructor(props) {

        super(props);

        this.state = {
            movementID    : 0,
            movementLimit : 10000,
            timeElapsed   : 0
        };
    }

    componentDidMount() {

        // store reference in <App />
        this.props.App.console = this;

        this.updateZoom();
    }

    /**
     * @param {Object} event
     *
     * @listens change
     */
    onChange(event) {

        const coords = this.props.App.state.gridSize;

        coords[event.target.name] = parseInt(event.target.value);

        this.props.App.setState({
            gridSize : coords
        });
    }

    /**
     *
     * @listens change
     */
    onChangeZoom() {

        this.updateZoom();
    }

    updateZoom() {

        const value = document.querySelector('input[name="zoom"]').value;

        document.querySelector('.grid').style.zoom = parseInt(value) / 100;
    }

    /**
     *
     * @listens click
     */
    onPlayClickEvent() {

        this.props.App.isPlay = !this.props.App.isPlay;

        if (this.props.App.isPlay) {
            this.props.App.play();
        }
        else {
            this.props.App.pause();
        }
    }

    /**
     *
     * @listens click
     */
    onNextClickEvent() {
        this.props.App.nextState();
    }

    /**
     *
     * @listens click
     */
    onStopClickEvent() {

        this.props.App.stop();
    }

    render() {

        const App = this.props.App;

        const playStateClassName = ((!this.props.App.isPlay) ? 'play' : 'pause') + "State state";

        const __time = ("" + this.state.timeElapsed).toHHMMSS();

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange.bind(this)} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange.bind(this)} />
                            </div>

                            <div className="controls">

                              ZOOM = <input type="number" name="zoom" onChange={this.onChangeZoom.bind(this)} defaultValue={this.props.App.zoom} />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent.bind(this)}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent.bind(this)}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent.bind(this)}></div>
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
}

/**
 *
 * @return {String}
 */
String.prototype.toHHMMSS = function() {

    const sec_num = parseInt(this, 10); // don't forget the second param

    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) { hours   = "0" + hours;   }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return hours + ':' + minutes + ':' + seconds;
};
