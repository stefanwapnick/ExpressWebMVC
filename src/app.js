let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let ejsMateEngine = require('ejs-mate');

let app = express();

let port = process.env.PORT || 3000;
let nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

// You can use router submodules to split your controller routing and handlers
let bookRouter = require('./routes/bookRoutes')(nav);
let adminRouter = require('./routes/adminRoutes')(nav);
let authRouter = require('./routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// Used for secret key when encrypting session cookies
app.use(session({secret: 'library'}));

// Configure password
require('./config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.engine('ejs', ejsMateEngine);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});