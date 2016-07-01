module.exports = {
    entry: [
        './app/Ant.jsx',
        './app/Cell.jsx',
        './app/Row.jsx',
        './app/Grid.jsx',
        './app/Console.jsx',
        './app/App.jsx'
    ],
    output: {
        path: './public/js',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: [
            "",
            ".js",
            ".json"
        ]
    },

    module: {
        loaders: [
            {
                test : /\.jsx?/,
                loader : 'babel'
            }
        ]
    }
};