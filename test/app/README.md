Test application
================

A simple express application to demonstrate how the library works.

    $ node index.js # start the app without coverage

    $ node index.js --coverage # start the app with coverage

    $ open http://localhost:8888/coverage # shows coverage info

    $ curl -o coverage.zip http://localhost:8888/coverage/download # gives you the zip file with reports

可以把Istanbul-middleware的所有文件放在一个服务器上或者本机，server目录下的index.js作为程序的服务端，运行命令node index.js --coverage

把Istanbul-middleware放在独立虚机上运行server下的indexserver.js作为中间件的服务端地址

在本地运行测试用例后，在case中添加get请求 http://被测程序服务端地址:8888/coverageData?和post请求post http://中间件所在的服务端地址:8050/coverage/client?

在本地浏览器输入地址查看结果：地址为中间件服务器的ip
http://中间件所在的服务端地址:8050/coverage/
