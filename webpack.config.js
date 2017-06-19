module.exports = {
    entry : './src/App.js',
    output: {
        path: __dirname + '/public/js/',
        filename: 'bundle.js',
        library: 'App'
    },

    resolve: {
        extensions: [".js"]
    },

    module: {
        loaders: [
            {
                test : /\.js?/,
                exclude: /node_modules/,
                loader : 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    }
};
