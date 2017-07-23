import { h, render, Component } from 'preact';

import { Grid    } from './Grid';
import { Console } from './Console';

class App extends Component {

    constructor(props) {

        super(props);

        /** COMPONENT REFERENCE **/

        // <Cell /> list
        this.cells = [];

        // <Cell />
        this.currentCell = null;

        // <Ant />
        this.ant = null;

        // <Console />
        this.console = null;

        this.movementID     = 0;
        this.movementLimit  = 11000;
        this.speed          = 0;

        this.timeoutHandler = null;
        this.timerHandler   = null;

        this.zoom = 13;

        this.side = {
            TOP    : 0,
            RIGHT  : 1,
            BOTTOM : 2,
            LEFT   : 3
        };

        this.isStop = true;
        this.isPlay = false;

        this.state = {

            gridSize: {
                x : 100,
                y : 100
            }
        };
    }

    timer() {

        this.console.setState({
            timeElapsed : ++this.console.state.timeElapsed
        });
    }

    draw() {

        const coords = this.ant.state;

        if (this.currentCell.state.isBlack)
        {
            if (this.ant.state.side === this.side.TOP)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.state.side === this.side.RIGHT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
            else if (this.ant.state.side === this.side.BOTTOM)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.state.side === this.side.LEFT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
        }
        else
        {
            if (this.ant.state.side == this.side.TOP)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.state.side == this.side.RIGHT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
            else if (this.ant.state.side == this.side.BOTTOM)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.state.side === this.side.LEFT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
        }

        // toggle old cell state
        this.updateCurrentCell({
            isBlack   : !this.currentCell.state.isBlack,
            antIsHere : false
        })
        .then(this.updateCell.bind(this, coords.x, coords.y, {
                antIsHere : true
        }))
        .then(this.updateAnt.bind(this, {
            x        : coords.x,
            y        : coords.y,
            rotation : coords.rotation,
            side     : coords.side,
        }));

        // update console
        this.console.setState({
            movementID : ++this.console.state.movementID
        });
    }

    /******************************** CONTROLS ********************************/

    play() {

        this.timeoutHandler = setInterval(() => {
            this.draw();
        }, this.speed);

        this.timerHandler = setInterval(() => {
            this.timer();
        }, 1000);
    }

    nextState() {
        this.draw();
    }

    pause() {
        clearInterval(this.timeoutHandler);
        clearInterval(this.timerHandler);
    }

    stop() {

        clearInterval(this.timeoutHandler);
        clearInterval(this.timerHandler);

        this.isPlay = false;
        this.isStop = true;

        this.render();
    }

    /**
     * @param {Object} state
     *
     * @return {Promise}
     */
    updateCurrentCell(state) {

        return new Promise(resolve => {
            this.currentCell.setState(state, resolve);
        });
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Object} state
     *
     * @return {Promise}
     */
    updateCell(x, y, state) {

        return new Promise(resolve => {

            this.cells[x][y].setState(state, resolve);
        });
    }

    /**
     * @param {Object} state
     *
     * @return {Promise}
     */
    updateAnt(state) {

        return new Promise(resolve => {

            this.ant.setState(state, resolve);
        });
    }

    render() {
        return <div>
                   <Console App={this} />
                   <Grid App={this} />
               </div>;
    }
}

render(<App />, document.getElementById('app'));
