const path = require('path');

module.exports = {
    entry: './src/app.js',
    devtool: 'source-map',
    output: {
        filename: 'Krylic.build.js',
        path: path.resolve(__dirname, 'dist'),
        library : 'Krylic',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    // mode: 'development',
    mode: 'production',
};
