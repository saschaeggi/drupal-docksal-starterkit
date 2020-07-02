const path = require('path');
const globImporter = require('node-sass-glob-importer');
const Fiber = require('fibers');

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../'),
      use: [
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              importer: [
                globImporter()
              ],
              fiber: Fiber
            }
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.resolve(__dirname, '../styles/settings/*.scss'),
            ]
          }
        }
      ]
    });

    // Remove SVG from existing file-loader
    config.module.rules = config.module.rules.map(rule => {
      if (String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        };
      }
      return rule;
    });

    // source code files support
    config.module.rules.push({
      test: /\.(story|story.mdx)$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'javascript' },
        },
      ],
      exclude: [/node_modules/],
      enforce: 'pre',
    });

    // add svg support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['babel-loader'],
    });

    // add gql support
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.resolve = {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.gql', '.graphql'],
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../'),
        '@base': path.resolve(__dirname, '../src/base/'),
        '@components': path.resolve(__dirname, '../src/components/'),
        '@layouts': path.resolve(__dirname, '../src/layouts/'),
        '@modules': path.resolve(__dirname, '../src/modules/'),
        '@pages': path.resolve(__dirname, '../src/pages/'),
        '@graphql': path.resolve(__dirname, '../graphql/'),
        '@styles': path.resolve(__dirname, '../styles/'),
      },
    };

    // Return the altered config
    return config;
  },
  stories: [
    '../src/**/**/*.story',
    '../src/**/**/*.story.mdx'
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ]
};
