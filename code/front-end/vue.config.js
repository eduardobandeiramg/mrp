const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
   
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://localhost:3000', // Substitua pela URL do backend
                changeOrigin: true
            }
        }
    }
});
