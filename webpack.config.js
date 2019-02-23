module.exports = {
 mode: 'development',
 entry: './src/index.js',
 output: {
  filename: 'app.js'
 },
  watch: true,
 module: {
  rules: [
   {
    test: /\.styl$/,
    use: [
     {
       loader: "style-loader" // creates style nodes from JS strings
     },
     {
       loader: "css-loader" // translates CSS into CommonJS
     },
     {
       loader: "stylus-loader" // compiles Stylus to CSS
     }
    ]
   }
  ]
 }
}