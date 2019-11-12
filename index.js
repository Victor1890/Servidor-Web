const express = require('express');
const app = express();
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// settings
app.set('port', process.env.PORT || 3000);// si hay un puerto definido en el sistema, úsalo; sino usa el 3000
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// middlewares - funciones que procesan datos antes que el servidor los reciba
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.use('/', require('./routes/index'));
app.use('/api/contacts', require('./routes/contacts'));


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})