const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': '@vue/compat'
            }
        }
    },
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://localhost:3000', // Substitua pela URL do backend
                changeOrigin: true
            }
        }
    }
});
