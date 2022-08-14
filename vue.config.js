// const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  // 1. 配置方式一：CLI提供的属性
  outputDir: './build',
  // 2. 配置方式二：和webpack属性完全一致，最终会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'icon'
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ]
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3. 配置方式三：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  //   config.devServer.open(true).host('localhost')
  // }
})
