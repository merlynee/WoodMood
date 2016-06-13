var Index = require('../api/controllers/indexController')




var _ = require('underscore');


module.exports = function(app){



//预处理
app.use(function(req,res,next){
	app.locals.user = req.session.user
	next()
})

//index
app.get('/',Index.index)

}