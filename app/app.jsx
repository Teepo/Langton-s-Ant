var App = React.createClass({

    getInitialState: function () {

        return {
            gridSize : {
                x : 11,
                y : 11
            },

            ant : {
                x : 5,
                y : 5
            },

            currentCell : null,

            speed : 1000
        };
    },

    componentWillMount: function() {
        console.log('APP MOUNT');
    },

    componentDidMount: function() {
        console.log('APP DID MOUNT');
    },

    componentDidUpdate: function() {
        console.log('APP DID UPDATE');
    },

    componentWillUpdate: function() {
        console.log('APP WILL UPDATE');
    },

    componentWillUnmount: function() {
        console.log('APP UNMOUNT');
    },

    draw: function() {

        console.log('APP DRAW', this.state);

        var coords = this.state.ant;

        if (this.state.currentCell.state.isBlack)
            coords.x += 1;
        else
            coords.y += 1;

        this.setState({
            ant : coords
        });
    },

    render: function() {

        console.log('RENDER APP');

        return (
            <div>
              <Console App={this} />
              <Grid    App={this} />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));