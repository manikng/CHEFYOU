
// webpack.config.js

const Dotenv = require('dotenv-webpack');



module.exports = {

     // other configurations...

     plugins: [

          new Dotenv()

     ],

     resolve: {

          fallback: {

               "process": require.resolve("process/browser")

          }

     }

};
