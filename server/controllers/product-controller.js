var Products = require('../datasets/Products');
var fs = require('fs-extra');
var path = require('path');
var uuid = require('node-uuid');
var url = require('url');


module.exports.addProducts = function(req,res){

	var file = req.files.file;
	var item = new Products(req.body.newProduct);
	var uploadDate = new Date().toISOString;
	//console.log(req.body);


	var tempPath = file.path;
	var tergetPath = path.join(__dirname,"../../uploads/" + uploadDate + file.name);
	var savePath = uploadDate + file.name;
	var productId = 'pid'+uuid.v1();
	

	fs.rename(tempPath,tergetPath,function(err){

		if(err){

			console.log(err);
		}else{
			item.productId = productId;
			item.image = savePath;
			console.log(item);
			item.save(function(err,data){

		if(err){
			console.log(err);
		}

		else{
		Products.find({}).sort({Title:-1}).exec(function(err,allProducts){

		if(err){
			res.error(err);
			console.log(err);
		}else{
			//console.log(allProducts);
			res.json(allProducts);
		}

	});
	}

	})
		
			console.log("File Moved");

		}
	})

	
	
}

module.exports.getProducts = function(req,res){


	var item = new Products(req.body);
	//console.log(req.body);
	
			
		Products.find({}).exec(function(err,allProducts){

		if(err){
			res.error(err);
			console.log(err);
		}else{
			//console.log(allProducts);
			res.json(allProducts);
		}

	});
	

	
	
}


module.exports.getProductsForSearch = function(req,res){

//console.log(req);
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
var q = query.q;
console.log(query);
console.log(q);


var regex = new RegExp([".*", q, ".*"].join(""), "i");

console.log(regex);

Products.find( {Title: regex} ).exec(function(err,allProducts){

	if(err){
			//res.error(err);
			console.log(err);
		}else{
			//console.log(allProducts);
			res.json(allProducts);
		}

})


}

module.exports.getProductDetails = function(req,res){

var id = req.body._id;
console.log(id);


/*var productId =req.body.id;*/

Products.find({"_id":id},function(err,response){

if(err)
	console.log(err);

console.log(response);
res.json(response);


});

}
