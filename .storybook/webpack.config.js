  const path = require('path')
  const rootPath = path.resolve(__dirname, '../')

  // -- to run webpack in full control mode
  module.exports = ({ config }) => {
    // -- tells webpack how to resolve various dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': rootPath,
      '~~': rootPath,
      '@': rootPath,
      // -- when using stylus, this is necessary in order to help storybook resolve any stylus files that your component might import
      assets: `${rootPath}/src/styl`
    }
    // -- tells storybook how to work with pug
    config.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    })
    // -- tells storybook how to work with various vue styles
    config.module.rules.push({
      test: /\.styl(us)?$/,
      use: ['style-loader', 'vue-style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          onlyLocals: false
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: true,
          import: []
        }
      }],
      include: rootPath
    })

    return config
  }
