const express = require('express'),
      database = require('./src/utility/database'),
      router = require('./src/utility/routes'),
      cors = require('cors'),
      cookies = require('cookie-parser'),
      compression = require('compression');


const app = express();
const corsOptions = {
    origin: 'http://localhost:3000, http://ihelper.herokuapp.com',
    credentials: true
};

database.init().then(() => {
    app.use(compression());
    app.use(express.static(__dirname + '/public'));
    app.use(cors(corsOptions));
    app.use(cookies());
    app.use(router);
    app.listen(process.env.PORT || 3000, function () {
        console.log('Interview Helper NodeJS server listening on port 3000!');
    });
});