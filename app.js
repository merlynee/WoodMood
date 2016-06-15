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
var favicon = require('serve-favicon');


var app = express()
app.use(favicon(__dirname + '/assert/img/favicon.ico'))
app.locals.moment = require('moment')
app.set('views','./views/pages')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieparser())
//静态资源，7天内cached，html不cached
app.use(serveStatic(__dirname + '/assert'))
// app.use(serveStatic(__dirname + '/asset',{
// 	maxAge: '1d',
// 	setHeaders: setCustomCacheControl
// }))
// function setCustomCacheControl (res, path) {
// 	if (serveStatic.mime.lookup(path) === 'text/html') {
// 		// Custom Cache-Control for HTML files
// 		res.setHeader('Cache-Control', 'public, max-age=0')
// 	}
// }
//mongo的配置
var dbURL = 'mongodb://localhost/nodeMongo'
mongoose.connect(dbURL)
//session的expire时间
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
	console.log('env:develop' );
	app.set('showStackError' , true)
	app.use(morgan(':method :url :status :remote-addr'))
	mongoose.set('debug',true)
}

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server Started:' + port );