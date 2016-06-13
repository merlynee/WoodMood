var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var moment = require('moment')
var expressSession = require('express-session')
var cookieparser = require('cookie-parser')
var morgan = require('morgan')   //HTTP request logger middleware for node.js
var MongoStore = require('connect-mongo')(expressSession)
var serveStatic = require('serve-static')

var app = express()
app.locals.moment = require('moment')
app.set('views','./views/pages')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieparser())
app.use(serveStatic(__dirname + '/public'))
var dbURL = 'mongodb://localhost/nodeMongo'
mongoose.connect(dbURL)
app.use(expressSession({
	secret : 'merlynee',
	store : new MongoStore({
		url: dbURL,
		collection: 'sessions'
	}),
	resave:false,
	cookie: {maxAge : 1000 * 60 * 60 * 24 * 7}, //7天cookie
	saveUninitialized: true 
}))


require('./config/routes')(app)

if('development' === app.get('env')){
	app.set('showStackError' , true)
	app.use(morgan(':method :url :status'))
	mongoose.set('debug',true)
}

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server Started:' + port );