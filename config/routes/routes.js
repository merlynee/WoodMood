var Index = require('../../api/controllers/indexController')




var _ = require('underscore');


module.exports = function(app){



//预处理
app.use(function(req,res,next){
	app.locals.user = req.session.user
	next()
})

//index
app.get('/',Index.index)

app.get('/nav',function(req,res,next){
	res.render('navtest.html');
})

}


//
// app.get('/',Index.index)
//
// }
// app.get('/',Index.index)
//
// }