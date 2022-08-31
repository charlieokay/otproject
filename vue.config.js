module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          '/api': {
                    target: 'https://61.177.38.142:8888',	//实际请求地址
                    changeOrigin: true,
                    ws:true //运行vue前端代码的时候,服务器还会运行一个websocketClient,与服务器通信。如果通信有问题是不会正常进行热重载的
                  },
          //  '/apifile': {
          //           target: 'https://61.177.38.142:8888',	//实际请求地址
          //           changeOrigin: true,
          //           ws:true //运行vue前端代码的时候,服务器还会运行一个websocketClient,与服务器通信。如果通信有问题是不会正常进行热重载的
          //         },  

        }
      }
    }
  };
