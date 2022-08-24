module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          '/api': {
                    target: 'https://61.177.38.142:8888',	//实际请求地址
                    changeOrigin: true,
                  }
                }
      }
    }
  };