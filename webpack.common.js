 import path from 'path';
 import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {

   entry: {
     app: './src/index.js',
   },

   plugins: [
     new HtmlWebpackPlugin({
       title: 'Odin ToDo',
       template: "./src/template.html"
     }),
   ],

   output: {
     filename: '[name].bundle.js',
     path: path.resolve(import.meta.dirname, 'dist'),
     clean: true,
   },

    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
 };