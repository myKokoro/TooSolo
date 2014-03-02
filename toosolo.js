#!/usr/bin/env node

var path = require('path'),
	fs = require('fs'),
	async = require('async'),
	commander = require('commander'),
	config = require(path.resolve(process.cwd() + '/config.json')),
	util = require('./lib/util.js'),
	coreParser = require('./lib/coreparser.js'),
	pluginName;

commander
    .version('2.0.10')
    .usage('[--选项 值]')
    .option('-i, --init', '在当前目录初始化TooSolo文件')
    .option('-s, --skin', '将默认皮肤复制到当前项目并使用该皮肤')
    .parse(process.argv);

if (commander.init) {
	pluginName = 'init';
}else if(commander.skin){
	pluginName = 'defineSkin';
}


init();

function init(){

	// Q.longStackSupport = true;

	// var dfd = Q.when();

	global.tooSolo = {};

	if(!config.skinPath){
		config.skinPath = path.join(__dirname,'./skin');
	}
	if(!config.globalPath){
		config.globalPath = path.join(config.sourcePath,'./global');
	}
	if(!config.blogPath){
		config.blogPath = path.join(config.sourcePath,'./blogs');
	}

	global.tooSolo.config = config;

	// dfd = dfd.then(function(){
		console.log('\n==================== Solo 2.0 ====================\n');
	// });

	if(pluginName){	//如果指定了插件名字，则调用对应插件

		// dfd = dfd.then(function(){
			require('./lib/plugins'+pluginName)();
		// });


	}else{

		var tasks = [coreParser.parse];

		// async.series([])

		async.series([coreParser.parse,
				_dealParserPlugins,
				_dealPagePlugins,
				function(){

			console.log('\n=================== 博客构建完成 ===================\n');
		}]);

		// dfd = dfd.then(coreParser.parse).then(_dealParserPlugins).then(_dealPagePlugins);

	// dfd = dfd.then(function(){
		// console.log('\n=================== 博客构建完成 ===================\n');
	// });
	}

}

function _dealParserPlugins(callback){

	var parserPluginsPath = path.join(__dirname,'./lib/parserplugins');
	async.waterfall([function(callback){

		fs.readdir(parserPluginsPath,function(err,fileList){
			callback(null,fileList);
		});

	},function(fileList,callback){
		var pluginList = [];
		fileList.forEach(function(pluginFile){
			var pluginName = pluginFile.replace(/\.js$/,'');
			var disabledList = config.disabledParserPlugins;
			if(!disabledList || disabledList.indexOf(plugin) === -1){
				if(/\.js$/.test(pluginFile)){
					pluginList.push(require(path.join(parserPluginsPath,pluginName)));
				}
			};
		});
		async.series(pluginList,callback)
	}],function(err){
		if(err){
			console.log(err);
		}
		// console.log('er',err);
		callback();
	});

}

function _dealPagePlugins(callback){

	var pagePluginsPath = path.join(__dirname,'./lib/pageplugins');
	async.waterfall([function(callback){

		fs.readdir(pagePluginsPath,function(err,fileList){
			callback(null,fileList);
		});

	},function(fileList,callback){
		var pluginList = [];
		fileList.forEach(function(pluginFile){
			var pluginName = pluginFile.replace(/\.js$/,'');
			var disabledList = config.disabledPagePlugins;
			if(!disabledList || disabledList.indexOf(pluginName) === -1){
				if(/\.js$/.test(pluginFile)){
					pluginList.push(require(path.join(pagePluginsPath,pluginName)));
				}
			};
		});
		async.series(pluginList,callback)
	}],function(err){
		if(err){
			console.log(err);
		}
		callback();
	});

}
