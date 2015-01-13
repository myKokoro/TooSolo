# solo 是一个由Node构建的静态博客

- 这个静态博客是用markdown来写文章，通过皮肤模板可以build出html页面。
- 你可以将他提交至Github Pages等任何网站空间。
- 提供在线编译功能，可尝试集成github，完成自动编译并推送到pages分支功能
- 示例:<http://solo.toobug.net>

## 2.0 预览版特性

- 程序、源文件、构建结果完全分离，托管时只需要上传构建结果即可
- 全插件构架，可以任意扩展你需要的功能（标签、分类、RSS等等）

> 目前版本只供预览，尚有未开发完或者不稳定的部分。

## 用法说明

###　安装

	npm install -g toosolo

### 初始化

切到用于存放博客文件的目录（最好是空目录），然后执行以下命令进行初始化：

	toosolo --init

或者

	toosolo -i

初始化后的目录如下：

- `source/blogs`目录，用于存放博客文件（.md后缀），可以包含任意子目录。
- `source/pages`目录，用于存放pages（.md后续），可以包含任意子目录。
- `source/global`目录，用于存放其它放到站点根目录的文件，如robots.txt等。可包含子目录（比如文章中的图片放在images子目录，构建时会被复制为/images）。
- `config.json`文件，配置信息，详细结构如下：

	{

		"blogName" : "SOLO",
		"blogSubTitle" : "Life is Solo...",
		"blogKeywords" : "SOLO,Blog,Node,博客",
		"blogDescription" : "TooBug - 专注前端开发",

		"domain" : "solo.toobug.net",

		"sourcePath" : "./source",
		"distPath" : "./dist"

	}

其中`domain`不需要加`http://`和最后的`/`，`sourcePath`是上面准备的源文件的路径，`distPath`是构建结果的路径。所有路径相对于`config.json`。

### 编译

进入命令行，定位到`config.json`所在的目录，运行`toosolo`即可。

### 更多

> 以下部分尚属于不稳定阶段，稍后放出皮肤自定义的功能。

如果有需要可以自定义皮肤，运行如下命令将默认皮肤复制至`source`目录的`skin`子目录中

	toosolo --skin

或者

	toosolo -s

同时，`config.json`中会自动添加一个名为`skinPath`的配置指向皮肤目录。

皮肤目录下的子目录说明

- `html`目录，模板文件，使用`jade`模板引擎，目前包含`index.jade`，`page.jade`，`article.jade`三个文件。
- `html/include`用于存放被包含的公共部分，被包含的模板可以共享模板变量，且缩进必须重新开始计算（即从头开始缩进）
- 其它目录，直接被复制到站点根目录。

编写模板时请注意使用模板变量`basePath`来处理路径，目前该变量是按照`index.html`在根目录，文章和pages分别在`/article`和`/page`目录的规则输出。
BUG！！！
