var path = require('path'),
	fs = require('fs'),
	unzip = require('unzip');

module.exports = function(){
	console.log('初始化……')
	var initZipPath = path.join(__dirname,'../init.zip');
	fs.createReadStream(initZipPath).pipe(unzip.Extract({ path: process.cwd() }));
};
