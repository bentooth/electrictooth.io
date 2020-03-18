const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// const session = require('express-session');
//const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
//const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

//const verifyEthTip = require('./controllers/common').verifyEthTip;
//const passHTML = require('./controllers/common').passHTML;
// const getEnabledCurrencies = require('./controllers/paybear')
//   .getEnabledCurrencies;
// const getRates = require('./controllers/paybear').getRates;
//const getETHRate = require('./controllers/paybear').getETHRate;
const getBlog = require('./controllers/blog').getBlog;
const findBlogPost = require('./controllers/blog').findBlogPost;
const streamAudio = require('./controllers/blog').streamAudio;

app.use(
  cors({
    exposedHeaders: '*',
  }),
);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

function passHTML(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(
    err,
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
}

// const URI = 'mongodb://localhost:27017/CSC';
// const db = mongoose.connection.openUri(URI);
// db.on('error', () =>
//   console.error.bind(console, '# MongoDB - connection error: '),
// );
// db.once('open', () => console.log('Database Connection ok!'));

// app.use(
//   session({
//     secret: '172f0e7dfc3a4cda8ac48c0ab4d62887',
//     saveUninitialized: true,
//     resave: false,
//     store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 }),
//   }),
// );

//app.get('/api/verifytip', verifyEthTip);
//app.get('/api/paybear/currencies', getEnabledCurrencies);
//app.get('/api/paybear/rates', getRates);
//app.get('/api/paybear/ethrate', getETHRate);
app.get('/api/blog/:page', getBlog);
app.get('/api/find/:post_url', findBlogPost);
app.get('/api/stream/:title', streamAudio);
app.get('*', passHTML);

app.listen(port, () =>
  console.log(`App Server is listening on http://localhost:${port}`),
);
